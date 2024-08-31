package auth

import (
	"backend/internal/server/config"
	"backend/internal/server/ent"
	"context"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

const (
	ACCESS_TOKEN_EXPIRY  = 1 * time.Hour // Access token expires in an hour
	REFRESH_TOKEN_EXPIRY = time.Second   // 30 * 24 * time.Hour // Refresh token expires in a month
)

type Auth struct {
	Config config.AuthConfig
}

func NewAuth(config *config.Config) *Auth {
	return &Auth{
		Config: config.Auth,
	}
}

func (a *Auth) NewAccessToken(user *ent.User) (string, error) {
	return newUserToken(user, ACCESS_TOKEN_EXPIRY, a.Config.AccessTokenSecret)
}

// Refresh tokens are able to be revoked; we thus need to store them to figure out what refresh
// token is in use for a user. Thus, that's why this method has a db arg.
func (a *Auth) NewRefreshToken(db *ent.Client, user *ent.User) (string, error) {
	token, err := newUserToken(user, REFRESH_TOKEN_EXPIRY, a.Config.RefreshTokenSecret)
	if err != nil {
		return "", err
	}

	// Delete existing token
	existingToken, err := user.QueryRefreshToken().Only(context.Background())

	// Not found err is ok (means user has never logged in yet), any other err is bad
	if !errors.Is(err, &ent.NotFoundError{}) {
		return "", err
	}

	err = db.RefreshToken.DeleteOne(existingToken).Exec(context.Background())
	if err != nil {
		return "", err
	}

	// Add new token to db
	// We are hashing the refresh token so if a malicious actor gets access to the DB, they don't have a bunch of active refresh tokens
	// to do harm with.
	tokenHash, err := a.HashPassword(token)
	if err != nil {
		return "", err
	}

	_, err = db.RefreshToken.Create().SetUser(user).SetRefreshTokenHash(tokenHash).Save(context.Background())
	if err != nil {
		return "", err
	}

	return token, nil
}

func newUserToken(user *ent.User, duration time.Duration, secret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID.String(),                // subject (user id)
		"iss": "3stones",                       // issuer
		"aud": "user",                          // user role (audience)
		"exp": time.Now().Add(duration).Unix(), // expiration time
		"iat": time.Now().Unix(),               // issued at
	})

	tokenString, err := token.SignedString([]byte(secret))

	return tokenString, err
}

// If validation is successful, returns the user id asssociated with the token.
func (a *Auth) ValidateAccessToken(tokenString string) (string, error) {
	return validateToken(tokenString, a.Config.AccessTokenSecret)
}

// If validation is successful, returns the user id associated with the token.
// Refresh tokens are able to be revoked; we thus need to store them to figure out what refresh
// token is in use for a user. Thus, that's why this method has a db arg.
func (a *Auth) ValidateRefreshToken(db *ent.Client, tokenString string) (string, error) {
	userId, err := validateToken(tokenString, a.Config.RefreshTokenSecret)
	if err != nil {
		return "", err
	}

	// May be a valid refresh token at this point, but is it the one currently stored for the user?
	// Let's perform this check
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return "", err
	}

	user, err := db.User.Get(context.Background(), userUUID)
	if err != nil {
		return "", err
	}

	refreshToken, err := user.QueryRefreshToken().Only(context.Background())
	if err != nil {
		return "", err
	}

	match := a.ComparePasswords(refreshToken.RefreshTokenHash, tokenString)
	if !match {
		return "", errors.New("invalid refresh token")
	}

	return userId, nil
}

func validateToken(tokenString string, secret string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return "", err
	}

	if !token.Valid {
		return "", errors.New("invalid/expired token")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// expiration does not need to be checked here; that's already done for us in the jwt.Parse
		return claims["sub"].(string), nil
	} else {
		return "", errors.New("could not parse claims")
	}
}

// TODO: susceptible to rainbow attacks
func (a *Auth) HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	return string(bytes), err
}

func (a *Auth) ComparePasswords(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))

	if err != nil {
		return false
	} else {
		return true
	}
}
