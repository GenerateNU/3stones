package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
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
	userID, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	clientUserID := userID
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

	// Execute the request to create a link token
	response, _, err := c.ServiceParams.Plaid.PlaidApi.LinkTokenCreate(ctx.Context()).LinkTokenCreateRequest(*request).Execute()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create link token",
			"error":   err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"link_token": response.GetLinkToken(),
	})
}
