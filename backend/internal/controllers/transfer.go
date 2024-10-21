package controllers

import (
	"context"

	"backend/internal/api_errors"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	plaid "github.com/plaid/plaid-go/v29/plaid"
)

type TransferController struct {
	ServiceParams *types.ServiceParams
}

func NewTransferController(serviceParams *types.ServiceParams) *TransferController {
	return &TransferController{
		ServiceParams: serviceParams,
	}
}

func StringPointer(s string) *string {
	return &s
}

// CreateTransferAuthorization handles creating a transfer authorization.
func (c *TransferController) CreateTransferAuthorization(ctx *fiber.Ctx) error {
	plaidClient := c.ServiceParams.Plaid

	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	// Replace with actual logic to get information
	recipientID := userId
	amount := "15.00"
	transferType := plaid.TRANSFERTYPE_CREDIT
	transferNetwork := plaid.TRANSFERNETWORK_ACH
	currency := "USD"

	ctxReq := context.Background()

	user := plaid.TransferAuthorizationUserInRequest{
		LegalName:    "User Name",                       // Use an actual user name
		EmailAddress: StringPointer("user@example.com"), // Use actual email, if applicable
	}

	// Create a new Transfer Authorization request with all the required parameters
	transferAuthorizationRequest := plaid.NewTransferAuthorizationCreateRequest(
		recipientID,
		amount,
		transferType,
		transferNetwork,
		currency,
		user,
	)

	// Make the API call to create a transfer authorization
	transferAuthorizationResp, _, err := plaidClient.PlaidApi.TransferAuthorizationCreate(ctxReq).TransferAuthorizationCreateRequest(*transferAuthorizationRequest).Execute()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	authorizationID := transferAuthorizationResp.Authorization.Id

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"authorization_id": authorizationID,
	})
}

// CreateTransfer handles creating an actual transfer after authorization.
func (c *TransferController) CreateTransfer(ctx *fiber.Ctx) error {
	plaidClient := c.ServiceParams.Plaid

	// Extract authorization ID from request body
	var requestBody struct {
		AuthorizationID string `json:"authorization_id"`
		RecipientID     string `json:"recipient_id"`
		Amount          string `json:"amount"`
	}

	if err := ctx.BodyParser(&requestBody); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	if requestBody.AuthorizationID == "" || requestBody.RecipientID == "" || requestBody.Amount == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Missing required fields")
	}

	ctxReq := context.Background()

	transferRequest := plaid.NewTransferCreateRequest(
		requestBody.AuthorizationID,
		requestBody.RecipientID,
		requestBody.Amount,
		"USD",
	)

	transferResp, _, err := plaidClient.PlaidApi.TransferCreate(ctxReq).TransferCreateRequest(*transferRequest).Execute()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"transfer_id": transferResp.Transfer.Id,
		"status":      transferResp.Transfer.Status,
	})
}
