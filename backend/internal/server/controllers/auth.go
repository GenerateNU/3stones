package controllers

import (
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

type LoginRequestBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *AuthController) Login(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(fiber.Map{})
}

func (c *AuthController) Logout(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(fiber.Map{})
}

type RegisterRequestBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *AuthController) Register(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(fiber.Map{})
}
