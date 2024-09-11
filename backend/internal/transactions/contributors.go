package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetContributors(db *pgxpool.Pool) ([]models.Contributor, error) {
	rows, err := db.Query(context.Background(), "SELECT * FROM contributors")
	if err != nil {
		return nil, err
	}

	contributors := []models.Contributor{}

	defer rows.Close()
	for rows.Next() {
		var id uuid.UUID
		var firstName string
		var lastName string
		var email string
		err = rows.Scan(&id, &firstName, &lastName, &email)
		if err != nil {
			return nil, err
		}

		contributors = append(contributors, models.Contributor{
			ID:        id,
			FirstName: firstName,
			LastName:  lastName,
			Email:     email,
		})
	}

	return contributors, nil
}
