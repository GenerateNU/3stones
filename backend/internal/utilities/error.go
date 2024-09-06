package utilities

import "github.com/gofiber/fiber/v2"

func MakeError(ctx *fiber.Ctx, status int, message string) error {
	return ctx.Status(status).JSON(fiber.Map{"error": message})
}
