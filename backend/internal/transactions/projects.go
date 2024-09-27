package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetProjects(db *pgxpool.Pool) ([]models.Project, error) {
	rows, err := db.Query(context.Background(), "SELECT id, developer_id, title, description, completed, funding_goal_cents, premise, street, locality, state, zipcode FROM projects")
	if err != nil {
		return nil, err
	}

	projects := []models.Project{}

	defer rows.Close()
	for rows.Next() {
		var id uuid.UUID
		var developerID uuid.UUID
		var title string
		var description string
		var completed bool
		var fundingGoalCents int32
		var premise string
		var street string
		var locality string
		var state string
		var zipcode string

		err = rows.Scan(&id, &developerID, &title, &description, &completed, &fundingGoalCents, &premise, &street, &locality, &state, &zipcode)
		if err != nil {
			return nil, err
		}

		projects = append(projects, models.Project{
			ID:               id,
			DeveloperID:      developerID,
			Title:            title,
			Description:      description,
			Completed:        completed,
			FundingGoalCents: fundingGoalCents,
			Premise:          premise,
			Street:           street,
			Locality:         locality,
			State:            state,
			Zipcode:          zipcode,
		})
	}

	return projects, nil
}

func GetProjectTotalFunded(db *pgxpool.Pool, id uuid.UUID) ([]models.Project, error) {
	rows, err := db.Query(context.Background(), "SELECT SUM(funded_cents) FROM investor_investments JOIN projects ON investor_investments.project_id = projects.id WHERE projects.id = $1", id)
	if err != nil {
		return nil, err
	}

	projects := []models.Project{}

	defer rows.Close()
	for rows.Next() {
		var id uuid.UUID
		var developerID uuid.UUID
		var title string
		var description string
		var completed bool
		var fundingGoalCents int32
		var premise string
		var street string
		var locality string
		var state string
		var zipcode string

		err = rows.Scan(&id, &developerID, &title, &description, &completed, &fundingGoalCents, &premise, &street, &locality, &state, &zipcode)
		if err != nil {
			return nil, err
		}

		projects = append(projects, models.Project{
			ID:               id,
			DeveloperID:      developerID,
			Title:            title,
			Description:      description,
			Completed:        completed,
			FundingGoalCents: fundingGoalCents,
			Premise:          premise,
			Street:           street,
			Locality:         locality,
			State:            state,
			Zipcode:          zipcode,
		})
	}

	return projects, nil
}
