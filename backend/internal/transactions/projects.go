package transactions

import (
	"context"
	"errors"

	"backend/internal/api_errors"
	"backend/internal/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
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

func GetProjectById(db *pgxpool.Pool, id uuid.UUID) (*models.Project, error) {
	// Execute the query with the provided context and developer ID
	row := db.QueryRow(
		context.Background(),
		"SELECT id, developer_id, title, description, completed, funding_goal_cents, premise, street, locality, state, zipcode FROM projects WHERE ID = $1",
		id)

	var project models.Project
	err := row.Scan(
		&project.ID,
		&project.DeveloperID,
		&project.Title,
		&project.Description,
		&project.Completed,
		&project.FundingGoalCents,
		&project.Premise,
		&project.Street,
		&project.Locality,
		&project.State,
		&project.Zipcode)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, &api_errors.UUID_NOT_FOUND
		}

		return nil, err
	}

	return &project, nil
}

func PostInvestmentById(ctx *fiber.Ctx, db *pgxpool.Pool, projectId uuid.UUID, amount int32) error {
	// Get the current project to check for funding goal
	project, err := GetProjectById(db, projectId)
	if err != nil {
		return err
	}

	// extract investor id from locals context
	investorId := ctx.Locals("userId")

	// Check with Sumer and Arav for function name to get total funded amount
	// for now, we'll query directly until the name is given
	var amountFunded int32
	row := db.QueryRow(context.Background(), "SELECT SUM(funded_cents) FROM investor_investments WHERE project_id = $1", projectId)

	err = row.Scan(&amountFunded)
	if err != nil {
		return err
	}

	// check if amount invested is greater than total funding goal and that the investor id was successfully extracted
	if amountFunded+amount <= project.FundingGoalCents {
		_, err = db.Exec(ctx.Context(),
			`INSERT INTO investor_investments(project_id, investor_id, funded_cents) 
		VALUES ($1, $2, $3)`, projectId, investorId, amount)
		if err != nil {
			return err
		}
	} else {
		return &api_errors.FUNDING_GOAL_EXCEEDED
	}
	// if there was no errors in the process of adding it to the database return nothing
	return nil
}
