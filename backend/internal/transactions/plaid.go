package transactions

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func StoreAccessToken(db *pgxpool.Pool, userID uuid.UUID, accessToken, itemID string) error {
	query := `
			UPDATE investors
			SET access_token = '$1', item_id = '$2'
			WHERE supabase_id = '$3';
			`

	_, err := db.Exec(context.Background(), query, accessToken, itemID, userID)
	return err
}
