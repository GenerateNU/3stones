package transactions

import (
	"context"
	"fmt"
	"time"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func CheckInvestorExists(pool *pgxpool.Pool, investorID string) (bool, error) {
	query := "SELECT 1 FROM investors WHERE supabase_id = $1"

	var exists int
	err := pool.QueryRow(context.Background(), query, investorID).Scan(&exists)
	if err != nil {
		if err.Error() == "no rows in result set" {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

func CreateInvestor(pool *pgxpool.Pool, supabaseID string) error {
	// Define the INSERT query
	query := `
		INSERT INTO investors (supabase_id, first_name, last_name)
		VALUES ($1, $2, $3);
	`

	// Execute the query, setting first_name and last_name as empty strings
	_, err := pool.Exec(context.Background(), query, supabaseID, "", "")
	if err != nil {
		return fmt.Errorf("failed to insert investor: %w", err)
	}

	return nil
}

func GetProfile(db *pgxpool.Pool, investorId uuid.UUID) (models.InvestorProfile, error) {
	query := "SELECT first_name, last_name FROM investors WHERE supabase_id = $1"

	var investorProfile models.InvestorProfile
	err := db.QueryRow(context.Background(), query, investorId).Scan(&investorProfile.FirstName, &investorProfile.LastName)
	if err != nil {
		return models.InvestorProfile{}, err
	}

	return investorProfile, nil
}

func GetHistory(db *pgxpool.Pool, investorID uuid.UUID, limit int, offset int) ([]models.HistoryEntry, error) {
	query := "SELECT created_at, project_id, funded_cents FROM investor_investments WHERE investor_id = $1 ORDER BY created_at LIMIT $2 OFFSET $3"
	rows, err := db.Query(context.Background(), query, investorID, limit, offset)
	if err != nil {
		return nil, err
	}

	var history []models.HistoryEntry
	defer rows.Close()

	for rows.Next() {
		var createdAt time.Time
		var projectID uuid.UUID
		var fundedCents int

		err = rows.Scan(&createdAt, &projectID, &fundedCents)
		if err != nil {
			return nil, err
		}

		entry := models.HistoryEntry{
			CreatedAt:   createdAt.Format(time.RFC3339),
			ProjectID:   projectID,
			FundedCents: fundedCents,
		}

		history = append(history, entry)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return history, nil
}

func GetCashBalance(pool *pgxpool.Pool, investorID string) (bool, error) {
	query := "SELECT cash_balance_cents FROM investors WHERE supabase_id = $1"

	var exists int
	err := pool.QueryRow(context.Background(), query, investorID).Scan(&exists)
	if err != nil {
		if err.Error() == "no rows in result set" {
			return false, nil
		}
		return false, err
	}

	return true, nil
}
