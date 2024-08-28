package auth

import (
	"backend/internal/server/config"
	"backend/internal/server/ent"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

const (
	ACCESS_TOKEN_EXPIRY  = 1 * time.Hour       // Access token expires in an hour
	REFRESH_TOKEN_EXPIRY = 30 * 24 * time.Hour // Refresh token expires in a month
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
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID.String(),
		"exp": time.Now().Add(ACCESS_TOKEN_EXPIRY),
	})

	tokenString, err := token.SignedString(a.Config.AccessTokenSecret)

	return tokenString, err
}

// If this token is valid, the returned string will be the user ID in the JWT signature.
func (a *Auth) ValidateAccessToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if token.Method.Alg() != "HS256" {
			return nil, errors.New("incorrect alg type")
		}

		return a.Config.AccessTokenSecret, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if claims["exp"].(time.Time).Before(time.Now()) {
			return "", errors.New("access token expired")
		}

		return claims["id"].(string), nil
	} else {
		return "", errors.New("could not parse claims")
	}
}

func (a *Auth) NewRefreshToken(user *ent.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID.String(),
		"exp": time.Now().Add(REFRESH_TOKEN_EXPIRY),
	})

	tokenString, err := token.SignedString(a.Config.RefreshTokenSecret)

	return tokenString, err
}

// If validation is successful, returns the user id associated with the token.
func (a *Auth) ValidateRefreshToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if token.Method.Alg() != "HS256" {
			return nil, errors.New("incorrect alg type")
		}

		return a.Config.RefreshTokenSecret, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if claims["exp"].(time.Time).Before(time.Now()) {
			return "", errors.New("refresh token expired")
		}

		return claims["id"].(string), nil
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
