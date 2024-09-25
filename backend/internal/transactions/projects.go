package transactions

import (
	"context"

	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetProjects(db *pgxpool.Pool) ([]models.Project, error) {
	rows, err := db.Query(context.Background(), "SELECT id, developer_id, title, description, location, completed, funding_goal_cents FROM projects")
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
		var location string
		var completed bool
		var fundingGoalCents int32
		err = rows.Scan(&id, &developerID, &title, &description, &location, &completed, &fundingGoalCents)
		if err != nil {
			return nil, err
		}

		projects = append(projects, models.Project{
			ID:               id,
			DeveloperID:      developerID,
			Title:            title,
			Description:      description,
			Location:         location,
			Completed:        completed,
			FundingGoalCents: fundingGoalCents,
		})
	}

	return projects, nil
}
