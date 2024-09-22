package auth

import (
	"context"

	"backend/internal/config"
	"backend/internal/transactions"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthFactory struct {
	Config *config.SupabaseConfig
	DB     *pgxpool.Pool
}

func (a *AuthFactory) Middleware() func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		token := ctx.Get("Authorization", "")

		if token == "" {
			return ctx.Status(fiber.StatusUnauthorized).SendString("unauthorized")
		}

		payload, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte(a.Config.JwtSecret), nil
		})
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).SendString("unauthorized")
		}

		// Subject will be user's UUID
		subject, err := payload.Claims.GetSubject()
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).SendString("missing subject")
		}

		investorExists, err := transactions.CheckInvestorExists(context.Background(), a.DB, subject)
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).SendString("server error")
		}

		if !investorExists {
			err := transactions.CreateInvestor(context.Background(), a.DB, subject)
			if err != nil {
				return ctx.Status(fiber.StatusInternalServerError).SendString("failed to create user")
			}
		}

		ctx.Locals("userId", subject)
		return ctx.Next()
	}
}
