package transactions

import (
	"context"
	"errors"

	"backend/internal/api_errors"
	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetDevelopers(db *pgxpool.Pool) ([]models.Developer, error) {
	rows, err := db.Query(context.Background(), "SELECT id, name, description, location FROM developers")
	if err != nil {
		return nil, err
	}

	developers := []models.Developer{}

	// Didn't see created at field returned in get all contributors so we are not including that either
	defer rows.Close()
	for rows.Next() {
		var id uuid.UUID
		var name string
		var description string
		var location string
		err = rows.Scan(&id, &name, &description, &location)
		if err != nil {
			return nil, err
		}

		developers = append(developers, models.Developer{
			ID:          id,
			Name:        name,
			Description: description,
			Location:    location,
		})
	}

	return developers, nil
}

func GetDeveloperById(db *pgxpool.Pool, id uuid.UUID) (*models.Developer, error) {
	// Execute the query with the provided context and developer ID
	row := db.QueryRow(context.Background(), "SELECT id, name, description, location FROM developers WHERE ID = $1", id)

	var developer models.Developer
	err := row.Scan(&developer.ID, &developer.Name, &developer.Description, &developer.Location)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, &api_errors.UUID_NOT_FOUND
		}

		return nil, err
	}

	return &developer, nil
}
