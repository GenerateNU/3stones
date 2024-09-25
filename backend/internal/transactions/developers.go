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
	rows, err := db.Query(context.Background(), "SELECT id, name, description, premise, street, locality, state, zipcode FROM developers")
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
		var premise string
		var street string
		var locality string
		var state string
		var zipcode string

		err = rows.Scan(&id, &name, &description, &premise, &street, &locality, &state, &zipcode)
		if err != nil {
			return nil, err
		}

		developers = append(developers, models.Developer{
			ID:          id,
			Name:        name,
			Description: description,
			Premise:     premise,
			Street:      street,
			Locality:    locality,
			State:       state,
			Zipcode:     zipcode,
		})
	}

	return developers, nil
}

func GetDeveloperById(db *pgxpool.Pool, id uuid.UUID) (*models.Developer, error) {
	// Execute the query with the provided context and developer ID
	row := db.QueryRow(context.Background(), "SELECT id, name, description, premise, street, locality, state, zipcode FROM developers WHERE ID = $1", id)

	var developer models.Developer
	err := row.Scan(&developer.ID, &developer.Name, &developer.Description, &developer.Premise, &developer.Street, &developer.Locality, &developer.State, &developer.Zipcode)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, &api_errors.UUID_NOT_FOUND
		}

		return nil, err
	}

	return &developer, nil
}
