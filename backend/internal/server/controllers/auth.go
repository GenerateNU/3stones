package controllers

import (
	"backend/internal/server/transactions"
	"backend/internal/server/types"

	"github.com/gofiber/fiber/v2"
)

type AuthController struct {
	serviceParams *types.ServiceParams
}

func NewAuthController(serviceParams *types.ServiceParams) *AuthController {
	return &AuthController{
		serviceParams: serviceParams,
	}
}

func (c *AuthController) Login(ctx *fiber.Ctx) error {
	var body types.UserCredentials
	if ctx.BodyParser(&body) != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	tokens, err := transactions.Login(c.serviceParams.DB, c.serviceParams.Auth, &body)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(tokens)
}

func (c *AuthController) Logout(ctx *fiber.Ctx) error {
	// With simple approach we took to refresh tokens this does nothing
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{})
}

func (c *AuthController) Register(ctx *fiber.Ctx) error {
	var body types.UserCredentials
	if ctx.BodyParser(&body) != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	tokens, err := transactions.Register(c.serviceParams.DB, c.serviceParams.Auth, &body)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(tokens)
}

func (c *AuthController) Refresh(ctx *fiber.Ctx) error {
	var body types.RefreshRequestBody
	if ctx.BodyParser(&body) != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	tokens, err := transactions.Refresh(c.serviceParams.DB, c.serviceParams.Auth, &body)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(tokens)
}
