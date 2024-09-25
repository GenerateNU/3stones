package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetDevelopers(ctx context.Context, db *pgxpool.Pool, id uuid.UUID) ([]models.Developer, error) {
	// Execute the query with the provided context and developer ID
	rows, err := db.Query(ctx, "SELECT id, name, description, location FROM developers WHERE ID = $1", id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var developers []models.Developer

	// Iterate through the rows and scan them into the Developer struct
	for rows.Next() {
		var developer models.Developer
		err := rows.Scan(&developer.ID, &developer.Name, &developer.Description, &developer.Location)
		if err != nil {
			return nil, err
		}
		developers = append(developers, developer)
	}

	// Return an error if no developers were found
	if len(developers) == 0 {
		return []models.Developer{}, nil
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return developers, nil
}
