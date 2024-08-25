package auth

import (
	"backend/internal/server/config"
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/nedpals/supabase-go"
)

type Auth struct {
	supabase *supabase.Client
}

func NewAuth(config *config.Config) *Auth {
	supabase := supabase.CreateClient(config.Auth.SupabaseUrl, config.Auth.SupabaseKey)
	return &Auth{supabase: supabase}
}

func (a *Auth) SignIn(credentials supabase.UserCredentials) (*supabase.AuthenticatedDetails, error) {
	return a.supabase.Auth.SignIn(context.Background(), credentials)
}

func (a *Auth) SignOut(userToken string) error {
	return a.supabase.Auth.SignOut(context.Background(), userToken)
}

func (a *Auth) SignUp(credentials supabase.UserCredentials) (*supabase.User, error) {
	return a.supabase.Auth.SignUp(context.Background(), credentials)
}

func (a *Auth) User(userToken string) (*supabase.User, error) {
	return a.supabase.Auth.User(context.Background(), userToken)
}

func (a *Auth) ValidateUser() fiber.Handler {
	return func(c *fiber.Ctx) error {
		userToken := c.Get("Authorization")
		if userToken == "" {
			return fiber.NewError(fiber.StatusUnauthorized, "Missing authorization token")
		}

		user, err := a.User(userToken)
		if err != nil {
			return fiber.NewError(fiber.StatusUnauthorized, "Invalid authorization token")
		}

		c.Locals("user", user)

		return c.Next()
	}
}
