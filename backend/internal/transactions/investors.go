package transactions

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func CheckInvestorExists(ctx context.Context, pool *pgxpool.Pool, investorID string) (bool, error) {
	query := "SELECT 1 FROM investors WHERE supabase_id = $1"

	var exists int
	err := pool.QueryRow(ctx, query, investorID).Scan(&exists)
	if err != nil {
		if err.Error() == "no rows in result set" {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

func CreateInvestor(ctx context.Context, pool *pgxpool.Pool, supabaseID string) error {
	// Define the INSERT query
	query := `
		INSERT INTO investors (supabase_id, first_name, last_name)
		VALUES ($1, $2, $3);
	`

	// Execute the query, setting first_name and last_name as empty strings
	_, err := pool.Exec(ctx, query, supabaseID, "", "")
	if err != nil {
		return fmt.Errorf("failed to insert investor: %w", err)
	}

	return nil
}
