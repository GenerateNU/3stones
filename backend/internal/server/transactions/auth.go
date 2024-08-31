package transactions

import (
	"backend/internal/server/auth"
	"backend/internal/server/ent"
	"backend/internal/server/ent/user"
	"backend/internal/server/types"
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func Login(db *ent.Client, auth *auth.Auth, creds *types.UserCredentials) (*types.AuthTokens, error) {
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

	refreshToken, err := auth.NewRefreshToken(db, user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make refresh token")
	}

	return &types.AuthTokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func Register(db *ent.Client, auth *auth.Auth, creds *types.UserCredentials) (*types.AuthTokens, error) {
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

	refreshToken, err := auth.NewRefreshToken(db, user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make refresh token")
	}

	return &types.AuthTokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func Refresh(db *ent.Client, auth *auth.Auth, creds *types.RefreshRequestBody) (*types.AuthTokens, error) {
	_, err := auth.ValidateRefreshToken(db, creds.RefreshToken)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusUnauthorized, "invalid/expired refresh token")
	}

	userUUID := uuid.New()
	user, err := db.User.Query().Where(user.IDEQ(userUUID)).Only(context.Background())
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to get user")
	}

	accessToken, err := auth.NewAccessToken(user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make access token")
	}

	refreshToken, err := auth.NewRefreshToken(db, user)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "failed to make refresh token")
	}

	return &types.AuthTokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
