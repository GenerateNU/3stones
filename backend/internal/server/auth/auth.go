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

func (a *Auth) NewRefreshToken(user *ent.User) (string, error) {
	return newUserToken(user, REFRESH_TOKEN_EXPIRY, a.Config.RefreshTokenSecret)
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
// Because only one refresh token can exist at a time, this
func (a *Auth) ValidateRefreshToken(tokenString string) (string, error) {
	return validateToken(tokenString, a.Config.RefreshTokenSecret)
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

	// TODO: time isbroken, interface{} is float64, not int64
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
