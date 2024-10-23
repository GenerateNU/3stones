package transactions

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func StoreAccessToken(db *pgxpool.Pool, userID uuid.UUID, accessToken, itemID string) error {
	query := `
        INSERT INTO investors (access_token, item_id)
        VALUES ($1, $2)
        where supabase_id = $3
    `

	_, err := db.Exec(context.Background(), query, accessToken, itemID, userID)
	return err
}
