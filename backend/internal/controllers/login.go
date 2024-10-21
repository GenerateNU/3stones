package controllers

import (
	"context"

	"backend/internal/api_errors"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	plaid "github.com/plaid/plaid-go/v29/plaid"
)

type PlaidLoginController struct {
	ServiceParams *types.ServiceParams
}

func NewPlaidLoginController(serviceParams *types.ServiceParams) *PlaidLoginController {
	return &PlaidLoginController{
		ServiceParams: serviceParams,
	}
}

func (c *PlaidLoginController) CreateLinkToken(ctx *fiber.Ctx) error {
	// Obtain the Plaid client from ServiceParams
	plaidClient := c.ServiceParams.Plaid

	// Prepare request context
	ctxReq := context.Background()

	// Extract user ID from context locals
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	// Create Link Token request payload with the required parameters
	linkTokenCreateRequest := plaid.NewLinkTokenCreateRequest(
		"3 Stones", // Client Name
		"en",       // Language
		[]plaid.CountryCode{plaid.COUNTRYCODE_US},              // Country Codes
		plaid.LinkTokenCreateRequestUser{ClientUserId: userId}, // User Info
	)

	// Set products to Auth, as per the login flow requirements
	linkTokenCreateRequest.SetProducts([]plaid.Products{plaid.PRODUCTS_AUTH})

	// Make API call to create a link token
	linkTokenResp, _, err := plaidClient.PlaidApi.LinkTokenCreate(ctxReq).LinkTokenCreateRequest(*linkTokenCreateRequest).Execute()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	// Respond with the link token
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"link_token": linkTokenResp.LinkToken,
	})
}
