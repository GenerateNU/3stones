package transactions

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetPortfolio(db *pgxpool.Pool, investorID uuid.UUID) (map[uuid.UUID]int, error) {
	query := "SELECT project_id, SUM(funded_cents) AS total_investment FROM investor_investments WHERE investor_id = $1 GROUP BY project_id"

	rows, err := db.Query(context.Background(), query, investorID)
	if err != nil {
		return nil, err
	}

	portfolio := make(map[uuid.UUID]int)

	defer rows.Close()
	for rows.Next() {
		var projectID uuid.UUID
		var totalFunded int

		err = rows.Scan(&projectID, &totalFunded)
		if err != nil {
			return nil, err
		}
		portfolio[projectID] = totalFunded
	}

	return portfolio, nil
}

func GetTotalPortfolioValue(db *pgxpool.Pool, investorID uuid.UUID) (int, error) {
	query := "SELECT COALESCE(SUM(funded_cents), 0) AS total_value FROM investor_investments WHERE investor_id = $1"

	var totalValue int
	err := db.QueryRow(context.Background(), query, investorID).Scan(&totalValue)
	if err != nil {
		return 0, err
	}

	return totalValue, nil
}
