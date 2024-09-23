package auth

import (
	"context"

	"backend/internal/config"
	"backend/internal/errors"
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
			return errors.UNAUTHORIZED.Send(ctx)
		}

		payload, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte(a.Config.JwtSecret), nil
		})
		if err != nil {
			return errors.UNAUTHORIZED.Send(ctx)
		}

		// Subject will be user's UUID
		subject, err := payload.Claims.GetSubject()
		if err != nil {
			return errors.INTERNAL_SERVER_ERROR.Send(ctx)
		}

		investorExists, err := transactions.CheckInvestorExists(context.Background(), a.DB, subject)
		if err != nil {
			return errors.INTERNAL_SERVER_ERROR.Send(ctx)
		}

		if !investorExists {
			err := transactions.CreateInvestor(context.Background(), a.DB, subject)
			if err != nil {
				return errors.INTERNAL_SERVER_ERROR.Send(ctx)
			}
		}

		ctx.Locals("userId", subject)
		return ctx.Next()
	}
}
