package transactions

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetHistory(db *pgxpool.Pool, investorID uuid.UUID, number_of_rows int, offset int) (map[uuid.UUID]int, error) {
	query := "SELECT project_id, funded_cents FROM investor_investments WHERE investor_id = $1 ORDER BY current_timestamp LIMIT $2 OFFSET $3"

	rows, err := db.Query(context.Background(), query, investorID, number_of_rows, offset)
	if err != nil {
		return nil, err
	}

	history := make(map[uuid.UUID]int)

	defer rows.Close()
	for rows.Next() {
		var projectID uuid.UUID
		var fundedCents int

		err = rows.Scan(&projectID, &fundedCents)
		if err != nil {
			return nil, err
		}
		history[projectID] = fundedCents
	}

	return history, nil
}
