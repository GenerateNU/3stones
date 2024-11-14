package transactions

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserInfo struct {
	LegalName string
	Email     string
}

func GetUserInfo(db *pgxpool.Pool, userID uuid.UUID) (UserInfo, error) {
	var userInfo UserInfo
	query := `
        SELECT
            CONCAT(first_name, ' ', last_name) AS legal_name,
            email,
        FROM investors
        WHERE id = $1
    `
	err := db.QueryRow(context.Background(), query, userID).Scan(
		&userInfo.LegalName,
		&userInfo.Email,
	)
	if err != nil {
		return UserInfo{}, err
	}
	return userInfo, nil
}
