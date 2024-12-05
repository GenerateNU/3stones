package controllers

import (
	"fmt"
	"strconv"

	"backend/internal/api_errors"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/plaid/plaid-go/v29/plaid"
)

type PlaidController struct {
	ServiceParams *types.ServiceParams
}

func NewPlaidController(serviceParams *types.ServiceParams) *PlaidController {
	return &PlaidController{
		ServiceParams: serviceParams,
	}
}

func (c *PlaidController) CreateLinkToken(ctx *fiber.Ctx) error {
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	clientUserID := id.String()

	countryCodes := []plaid.CountryCode{plaid.COUNTRYCODE_US}
	user := plaid.LinkTokenCreateRequestUser{
		ClientUserId: clientUserID,
	}

	request := plaid.NewLinkTokenCreateRequest(
		"3Stones",
		"en",
		countryCodes,
		user,
	)

	// Specify the products
	request.SetProducts([]plaid.Products{plaid.PRODUCTS_AUTH, plaid.PRODUCTS_TRANSACTIONS})

	redirectUri := "threestones://hosted-link-complete"
	isMobileApp := true
	request.SetHostedLink(plaid.LinkTokenCreateHostedLink{
		CompletionRedirectUri: &redirectUri,
		IsMobileApp:           &isMobileApp,
	})

	// Execute the request to create a link token
	response, _, err := c.ServiceParams.Plaid.PlaidApi.LinkTokenCreate(ctx.Context()).LinkTokenCreateRequest(*request).Execute()
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"link_token":      response.GetLinkToken(),
		"hosted_link_url": response.GetHostedLinkUrl(),
	})
}

func (c *PlaidController) ExchangePublicToken(ctx *fiber.Ctx) error {
	type RequestBody struct {
		PublicToken string `json:"public_token"`
	}

	var body RequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return &api_errors.INTERNAL_SERVER_ERROR
	}

	exchangeRequest := plaid.NewItemPublicTokenExchangeRequest(body.PublicToken)

	response, _, err := c.ServiceParams.Plaid.PlaidApi.ItemPublicTokenExchange(ctx.Context()).ItemPublicTokenExchangeRequest(*exchangeRequest).Execute()
	if err != nil {
		return err
	}

	accessToken := response.GetAccessToken()
	itemID := response.GetItemId()

	// Store accessToken and itemID securely in your database associated with the user
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	err = transactions.StoreAccessToken(c.ServiceParams.DB, id, accessToken, itemID)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"access_token": accessToken,
		"item_id":      itemID,
	})
}

func (c *PlaidController) Invest(ctx *fiber.Ctx) error {
	// Extract user ID
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	// Parse request body
	type RequestBody struct {
		PropertyID string `json:"property_id"`
		Amount     string `json:"amount"`
	}

	var body RequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return &api_errors.INVALID_REQUEST_BODY
	}

	// Validate input
	if body.PropertyID == "" || body.Amount == "" {
		return &api_errors.MISSING_FIELDS
	}

	// Convert Amount to integer (cents)
	amountCents, err := strconv.Atoi(body.Amount)
	if err != nil {
		return &api_errors.INVALID_INVESTMENT_AMOUNT
	}
	if amountCents <= 0 {
		return &api_errors.INVALID_INVESTMENT_AMOUNT
	}

	// Check if user has sufficient balance
	hasFunds, err := transactions.HasSufficientBalance(c.ServiceParams.DB, id, body.Amount)
	if err != nil {
		return err
	}
	if !hasFunds {
		return &api_errors.INSUFFICIENT_FUNDS
	}

	// Deduct amount from user's cash balance
	err = transactions.UpdateCashBalance(c.ServiceParams.DB, id, body.Amount, "withdraw")
	if err != nil {
		return err
	}

	transactionId, err := transactions.RecordInvestment(c.ServiceParams.DB, id, body.PropertyID, body.Amount)
	if err != nil {
		return err
	}

	type ResponseBody struct {
		TransactionId       uuid.UUID `json:"transaction_id"`
		NominalCents        int       `json:"nominal_cents"`
		AdministrativeCents int       `json:"administrative_cents"`
	}

	// Return success response
	return ctx.Status(fiber.StatusOK).JSON(ResponseBody{
		TransactionId:       transactionId,
		NominalCents:        amountCents,
		AdministrativeCents: 0,
	})
}

func (c *PlaidController) createTransferAuthorization(
	ctx *fiber.Ctx, accessToken, accountID, amount string, user transactions.UserInfo,
) (*plaid.TransferAuthorization, error) {
	transferType := plaid.TRANSFERTYPE_DEBIT
	transferNetwork := plaid.TRANSFERNETWORK_ACH
	achClass := plaid.ACHCLASS_WEB

	transferUser := plaid.NewTransferAuthorizationUserInRequest(user.LegalName)
	transferUser.SetEmailAddress(user.Email)

	transferAuthRequest := plaid.NewTransferAuthorizationCreateRequest(
		accessToken,
		accountID,
		transferType,
		transferNetwork,
		amount,
		*transferUser,
	)
	transferAuthRequest.SetAchClass(achClass)

	response, _, err := c.ServiceParams.Plaid.PlaidApi.TransferAuthorizationCreate(ctx.Context()).TransferAuthorizationCreateRequest(*transferAuthRequest).Execute()
	if err != nil {
		return nil, err
	}

	auth := response.GetAuthorization()
	return &auth, nil
}

func (c *PlaidController) createTransfer(
	ctx *fiber.Ctx, accessToken, accountID, authorizationID, amount, propertyID string,
) (*plaid.Transfer, error) {
	transferType := plaid.TRANSFERTYPE_DEBIT
	description := fmt.Sprintf("3 Stones Purchase of Property %s, Amount %s", propertyID, amount)

	transferRequest := plaid.NewTransferCreateRequest(
		accessToken,
		accountID,
		authorizationID,
		string(transferType),
	)
	transferRequest.SetAmount(amount)
	transferRequest.SetDescription(description)

	response, _, err := c.ServiceParams.Plaid.PlaidApi.TransferCreate(ctx.Context()).TransferCreateRequest(*transferRequest).Execute()
	if err != nil {
		return nil, err
	}

	transfer := response.GetTransfer()
	return &transfer, nil
}

func (c *PlaidController) Deposit(ctx *fiber.Ctx) error {
	// Extract user ID
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	// Parse request body
	type RequestBody struct {
		Amount string `json:"amount"`
	}

	var body RequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return &api_errors.INVALID_REQUEST_BODY
	}

	// Validate input
	if body.Amount == "" {
		return &api_errors.MISSING_FIELDS
	}

	// Retrieve access token
	accessToken, err := transactions.GetAccessToken(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}
	if accessToken == "" {
		return &api_errors.ACCESS_TOKEN_NOT_FOUND
	}

	// Retrieve account ID (first account)
	accountID, err := transactions.GetFirstAccountID(c.ServiceParams.Plaid, accessToken)
	if err != nil {
		return err
	}

	// Retrieve user info
	user, err := transactions.GetUserInfo(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	// Create transfer authorization
	transferAuthResponse, err := c.createTransferAuthorization(
		ctx, accessToken, accountID, body.Amount, user)
	if err != nil {
		return err
	}

	// Handle authorization decision
	if transferAuthResponse.Decision != "approved" {
		// Handle declined or user_action_required
		if transferAuthResponse.Decision == "declined" {
			return &api_errors.TRANSFER_AUTHORIZATION_DECLINED
		}
		if transferAuthResponse.Decision == "user_action_required" {
			return &api_errors.TRANSFER_AUTHORIZATION_USER_ACTION_REQUIRED
		}
		return &api_errors.TRANSFER_AUTHORIZATION_FAILED
	}

	authorizationID := transferAuthResponse.Id

	// Create transfer
	transferResponse, err := c.createTransfer(
		ctx, accessToken, accountID, authorizationID, body.Amount, "Deposit to cash balance")
	if err != nil {
		return err
	}

	// Update user's cash balance
	err = transactions.UpdateCashBalance(
		c.ServiceParams.DB, id, body.Amount, "deposit")
	if err != nil {
		return err
	}

	// Return transfer details
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"transfer_id":     transferResponse.Id,
		"transfer_status": transferResponse.Status,
	})
}

func (c *PlaidController) Withdraw(ctx *fiber.Ctx) error {
	// Extract user ID
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	// Parse request body
	type RequestBody struct {
		Amount string `json:"amount"`
	}

	var body RequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return &api_errors.INVALID_REQUEST_BODY
	}

	if body.Amount == "" {
		return &api_errors.MISSING_FIELDS
	}

	hasFunds, err := transactions.HasSufficientBalance(c.ServiceParams.DB, id, body.Amount)
	if err != nil {
		return err
	}
	if !hasFunds {
		return &api_errors.INSUFFICIENT_FUNDS
	}

	accessToken, err := transactions.GetAccessToken(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}
	if accessToken == "" {
		return &api_errors.ACCESS_TOKEN_NOT_FOUND
	}

	accountID, err := transactions.GetFirstAccountID(c.ServiceParams.Plaid, accessToken)
	if err != nil {
		return err
	}

	user, err := transactions.GetUserInfo(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	transferAuthResponse, err := c.createTransferAuthorization(
		ctx, accessToken, accountID, body.Amount, user)
	if err != nil {
		return err
	}

	if transferAuthResponse.Decision != "approved" {
		if transferAuthResponse.Decision == "declined" {
			return &api_errors.TRANSFER_AUTHORIZATION_DECLINED
		}
		if transferAuthResponse.Decision == "user_action_required" {
			return &api_errors.TRANSFER_AUTHORIZATION_USER_ACTION_REQUIRED
		}
		return &api_errors.TRANSFER_AUTHORIZATION_FAILED
	}

	authorizationID := transferAuthResponse.Id

	transferResponse, err := c.createTransfer(
		ctx, accessToken, accountID, authorizationID, body.Amount, "Withdraw from cash balance")
	if err != nil {
		return err
	}

	err = transactions.UpdateCashBalance(
		c.ServiceParams.DB, id, body.Amount, "withdraw")
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"transfer_id":     transferResponse.Id,
		"transfer_status": transferResponse.Status,
	})
}
