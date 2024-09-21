package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetProjects(db *pgxpool.Pool) ([]models.Contributor, error) {
	rows, err := db.Query(context.Background(), "SELECT * FROM projects")
	if err != nil {
		return nil, err
	}

	contributors := []models.Project{}

	defer rows.Close()
	for rows.Next() {
		var id uuid.UUID
		var developerID uuid.UUID
		var title string
		var description string
		var location string
		var completed bool
		var fundingGoalCents int32
		err = rows.Scan(&id, &developerID, &title, &description, &location, &completed, &fundingGoalCents)
		if err != nil {
			return nil, err
		}

		contributors = append(contributors, models.Contributor{
			ID: id,
		    DeveloperID: developerID,
		    Title: title,
		    Description: description,
		    Location: location,
		    Completed: completed,
		    FundingGoalCents: fundingGoalCents,
		})
	}

	return projects, nil
}
