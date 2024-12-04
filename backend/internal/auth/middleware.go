package auth

import (
	"backend/internal/api_errors"
	"backend/internal/config"

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
			return &api_errors.UNAUTHORIZED
		}

		payload, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte(a.Config.JwtSecret), nil
		})
		if err != nil {
			return &api_errors.UNAUTHORIZED
		}

		// Subject will be user's UUID
		subject, err := payload.Claims.GetSubject()
		if err != nil {
			return err
		}

		ctx.Locals("userId", subject)
		return ctx.Next()
	}
}
