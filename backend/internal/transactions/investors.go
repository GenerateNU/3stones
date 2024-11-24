package transactions

import (
	"context"
	"fmt"
	"strings"
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
		INSERT INTO investors (supabase_id, first_name, last_name, email, phone_number, ssn, premise, street, locality, state, zipcode)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
	`

	// Execute the query, setting first_name and last_name as empty strings
	_, err := pool.Exec(context.Background(), query, supabaseID, "John", "Doe", "unknown@email.com", "000-000-0000", "000-00-0000", "123", "Main St", "Anytown", "USA", "12345")
	if err != nil {
		return fmt.Errorf("failed to insert investor: %w", err)
	}

	return nil
}

func GetProfile(db *pgxpool.Pool, investorId uuid.UUID) (models.InvestorProfile, error) {
	query := "SELECT first_name, last_name, email, phone_number, ssn, premise, COALESCE(subpremise, '') as subpremise, street, locality, state, zipcode FROM investors WHERE supabase_id = $1"

	var investorProfile models.InvestorProfile
	err := db.QueryRow(context.Background(), query, investorId).Scan(
		&investorProfile.FirstName,
		&investorProfile.LastName,
		&investorProfile.Email,
		&investorProfile.PhoneNumber,
		&investorProfile.SSN,
		&investorProfile.Premise,
		&investorProfile.Subpremise,
		&investorProfile.Street,
		&investorProfile.Locality,
		&investorProfile.State,
		&investorProfile.Zipcode,
	)

	if err != nil {
		return models.InvestorProfile{}, err
	}

	return investorProfile, nil
}

func UpdateProfile(db *pgxpool.Pool, investorID uuid.UUID, investorProfile models.InvestorProfile) (models.InvestorProfile, error) {
	var setFields []string
	var args []interface{}
	argPosition := 1

	args = append(args, investorID)

	// TODO: validation is probably important
	if investorProfile.FirstName != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("first_name = $%d", argPosition))
		args = append(args, investorProfile.FirstName)
	}

	if investorProfile.LastName != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("last_name = $%d", argPosition))
		args = append(args, investorProfile.LastName)
	}

	if investorProfile.Email != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("email = $%d", argPosition))
		args = append(args, investorProfile.Email)
	}

	if investorProfile.PhoneNumber != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("phone_number = $%d", argPosition))
		args = append(args, investorProfile.PhoneNumber)
	}

	if investorProfile.SSN != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("ssn = $%d", argPosition))
		args = append(args, investorProfile.SSN)
	}

	if investorProfile.Premise != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("premise = $%d", argPosition))
		args = append(args, investorProfile.Premise)
	}

	if investorProfile.Subpremise != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("subpremise = $%d", argPosition))
		args = append(args, investorProfile.Subpremise)
	}

	if investorProfile.Street != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("street = $%d", argPosition))
		args = append(args, investorProfile.Street)
	}

	if investorProfile.Locality != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("locality = $%d", argPosition))
		args = append(args, investorProfile.Locality)
	}

	if investorProfile.State != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("state = $%d", argPosition))
		args = append(args, investorProfile.State)
	}

	if investorProfile.Zipcode != "" {
		argPosition++
		setFields = append(setFields, fmt.Sprintf("zipcode = $%d", argPosition))
		args = append(args, investorProfile.Zipcode)
	}

	// If no fields to update, return early
	if len(setFields) == 0 {
		return GetProfile(db, investorID)
	}

	query := fmt.Sprintf("UPDATE investors SET %s WHERE supabase_id = $1", strings.Join(setFields, ", "))
	_, err := db.Exec(context.Background(), query, args...)
	if err != nil {
		return models.InvestorProfile{}, err
	}

	return GetProfile(db, investorID)
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

func GetCashBalance(pool *pgxpool.Pool, investorID string) (int, error) {
	query := "SELECT cash_balance_cents FROM investors WHERE supabase_id = $1"

	var balance int
	err := pool.QueryRow(context.Background(), query, investorID).Scan(&balance)
	if err != nil {
		if err.Error() == "no rows in result set" {
			return 0, nil
		}
		return 0, err
	}

	return balance, nil
}
