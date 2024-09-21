package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetDevelopers(db *pgxpool.Pool) ([]models.Developer, error) {
	rows, err := db.Query(context.Background(), "SELECT * FROM developers")
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
