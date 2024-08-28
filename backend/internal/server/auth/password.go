package auth

import "golang.org/x/crypto/bcrypt"

// TODO: susceptible to rainbow attacks
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	return string(bytes), err
}
