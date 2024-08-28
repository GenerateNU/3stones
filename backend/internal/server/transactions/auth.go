package transactions

import (
	"backend/internal/server/auth"
	"backend/internal/server/ent"
	"backend/internal/server/ent/user"
	"backend/internal/server/jsontypes"
	"context"

	"github.com/gofiber/fiber/v2"
)

func Login(db *ent.Client, auth *auth.Auth, creds *jsontypes.UserCredentials) (*jsontypes.AuthTokens, error) {
	user, err := db.User.Query().Where(user.EmailEQ(creds.Email)).Only(context.Background())

	if err != nil {
		return nil, err
	}

	passwordsMatch := auth.ComparePasswords(user.Password, creds.Password)

	if !passwordsMatch {
		return nil, fiber.NewError(fiber.StatusUnauthorized, "invalid password")
	}

	accessToken, err := auth.NewAccessToken(user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make access token")
	}

	refreshToken, err := auth.NewRefreshToken(user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make refresh token")
	}

	return &jsontypes.AuthTokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func Register(db *ent.Client, auth *auth.Auth, creds *jsontypes.UserCredentials) (*jsontypes.AuthTokens, error) {
	passwordHash, err := auth.HashPassword(creds.Password)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "password hash failed")
	}

	user, err := db.User.
		Create().
		SetEmail(creds.Email).
		SetPassword(passwordHash).
		Save(context.Background())
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "user creation failed")
	}

	accessToken, err := auth.NewAccessToken(user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make access token")
	}

	refreshToken, err := auth.NewRefreshToken(user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make refresh token")
	}

	return &jsontypes.AuthTokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
