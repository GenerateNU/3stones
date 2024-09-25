package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetDeveloperById(db *pgxpool.Pool, id uuid.UUID) (*models.Developer, error) {
	// Execute the query with the provided context and developer ID
	row := db.QueryRow(context.Background(), "SELECT id, name, description, location FROM developers WHERE ID = $1", id)

	var developer models.Developer
	err := row.Scan(&developer.ID, &developer.Name, &developer.Description, &developer.Location)
	if err != nil {
		return nil, err
	}

	return &developer, nil
}
