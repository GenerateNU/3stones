package auth

import (
	"backend/internal/config"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// Use this to setup an authorized user.
func Authorized(config *config.SupabaseConfig) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		token := ctx.Get("Authorization", "")

		if token == "" {
			return ctx.Status(400).JSON(fiber.Map{"code": "unauthorized"})
		}

		payload, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte(config.JwtSecret), nil
		})
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{"code": "unauthorized"})
		}

		subject, err := payload.Claims.GetSubject()
		if err != nil {
			return ctx.Status(500).JSON(fiber.Map{"code": "missing subject"})
		}

		ctx.Locals("userId", subject)
		return ctx.Next()
	}
}
