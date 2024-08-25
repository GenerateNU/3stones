package controllers

import (
	"backend/internal/server/types"

	"github.com/gofiber/fiber/v2"
	"github.com/nedpals/supabase-go"
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
	var body LoginRequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	userCredentials := supabase.UserCredentials{
		Email:    body.Email,
		Password: body.Password,
	}

	details, err := c.serviceParams.Auth.SignIn(userCredentials)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	return ctx.Status(200).JSON(fiber.Map{"access_token": details.AccessToken})
}

func (c *AuthController) Logout(ctx *fiber.Ctx) error {
	token := ctx.Get("Authorization")
	if token == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "No access token"})
	}

	if err := c.serviceParams.Auth.SignOut(token); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid access token"})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{})
}

type RegisterRequestBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *AuthController) Register(ctx *fiber.Ctx) error {
	var body RegisterRequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	userCredentials := supabase.UserCredentials{
		Email:    body.Email,
		Password: body.Password,
	}

	_, err := c.serviceParams.Auth.SignUp(userCredentials)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Failed to register user"})
	}

	return ctx.SendStatus(fiber.StatusCreated)
}
