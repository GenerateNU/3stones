package transactions

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetHistory(db *pgxpool.Pool, investorID uuid.UUID, limit int, offset int) ([]map[string]interface{}, error) {
	query := "SELECT created_at, project_id, funded_cents FROM investor_investments WHERE investor_id = $1 ORDER BY created_at LIMIT $2 OFFSET $3"
	rows, err := db.Query(context.Background(), query, investorID, limit, offset)
	if err != nil {
		return nil, err
	}

	var history []map[string]interface{}
	defer rows.Close()

	for rows.Next() {
		var createdAt time.Time
		var projectID uuid.UUID
		var fundedCents int

		err = rows.Scan(&createdAt, &projectID, &fundedCents)
		if err != nil {
			return nil, err
		}

		entry := map[string]interface{}{
			"created_at":   createdAt.Format(time.RFC3339),
			"project_id":   projectID,
			"funded_cents": fundedCents,
		}

		history = append(history, entry)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return history, nil
}
