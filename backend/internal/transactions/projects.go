package transactions

import (
	"context"
	"errors"
	"time"

	"backend/internal/api_errors"
	"backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetProjects(db *pgxpool.Pool) ([]models.Project, error) {
	rows, err := db.Query(
		context.Background(),
		"SELECT id, developer_id, title, description, completed, funding_goal_cents, milestone, completion_date, premise, street, locality, state, zipcode, ST_X(coordinates::geometry) as latitude, ST_Y(coordinates::geometry) as longitude FROM projects")
	if err != nil {
		return nil, err
	}

	projects := []models.Project{}

	defer rows.Close()
	for rows.Next() {
		var project models.Project
		err := rows.Scan(
			&project.ID,
			&project.DeveloperID,
			&project.Title,
			&project.Description,
			&project.Completed,
			&project.FundingGoalCents,
			&project.Milestone,
			&project.CompletionDate,
			&project.Premise,
			&project.Street,
			&project.Locality,
			&project.State,
			&project.Zipcode,
			&project.Latitude,
			&project.Longitude)
		if err != nil {
			return nil, err
		}

		images, err := GetProjectImages(db, project.ID)
		if err != nil {
			return nil, err
		}
		project.Images = images

		projects = append(projects, project)
	}

	return projects, nil
}

func SearchProjects(db *pgxpool.Pool, query string) ([]models.Project, error) {
	rows, err := db.Query(
		context.Background(),
		"SELECT id, developer_id, title, description, completed, funding_goal_cents, milestone, completion_date, premise, street, locality, state, zipcode, ST_X(coordinates::geometry) as latitude, ST_Y(coordinates::geometry) as longitude FROM projects WHERE to_tsvector(description || ' ' || title || ' ' || street || ' ' || locality || ' ' || state || ' ' || zipcode) @@ to_tsquery($1);", query)
	if err != nil {
		return nil, err
	}

	projects := []models.Project{}

	defer rows.Close()
	for rows.Next() {
		var project models.Project
		err := rows.Scan(
			&project.ID,
			&project.DeveloperID,
			&project.Title,
			&project.Description,
			&project.Completed,
			&project.FundingGoalCents,
			&project.Milestone,
			&project.CompletionDate,
			&project.Premise,
			&project.Street,
			&project.Locality,
			&project.State,
			&project.Zipcode,
			&project.Latitude,
			&project.Longitude)
		if err != nil {
			return nil, err
		}

		images, err := GetProjectImages(db, project.ID)
		if err != nil {
			return nil, err
		}
		project.Images = images

		projects = append(projects, project)
	}

	return projects, nil
}

func GetProjectTotalFunded(db *pgxpool.Pool, id uuid.UUID) (int64, error) {
	var totalFundedCents int64

	err := db.QueryRow(context.Background(), "SELECT COALESCE(SUM(funded_cents), 0) AS sum FROM investor_investments WHERE project_id = $1", id).Scan(&totalFundedCents)
	if err != nil {
		return 0, err
	}

	return totalFundedCents, nil
}

func GetProjectById(db *pgxpool.Pool, id uuid.UUID) (*models.Project, error) {
	// Execute the query with the provided context and developer ID
	row := db.QueryRow(
		context.Background(),
		"SELECT id, developer_id, title, description, completed, funding_goal_cents, milestone, completion_date, premise, street, locality, state, zipcode, ST_X(coordinates::geometry) as latitude, ST_Y(coordinates::geometry) as longitude FROM projects WHERE ID = $1",
		id)

	var project models.Project
	err := row.Scan(
		&project.ID,
		&project.DeveloperID,
		&project.Title,
		&project.Description,
		&project.Completed,
		&project.FundingGoalCents,
		&project.Milestone,
		&project.CompletionDate,
		&project.Premise,
		&project.Street,
		&project.Locality,
		&project.State,
		&project.Zipcode,
		&project.Latitude,
		&project.Longitude)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, &api_errors.UUID_NOT_FOUND
		}

		return nil, err
	}

	images, err := GetProjectImages(db, project.ID)
	if err != nil {
		return nil, err
	}

	project.Images = images

	return &project, nil
}

func GetProjectImages(db *pgxpool.Pool, id uuid.UUID) ([]models.ImageLink, error) {
	rows, err := db.Query(context.Background(), `SELECT id, image_url FROM project_images WHERE project_id = $1;`, id)
	if err != nil {
		return nil, err
	}

	var imageUrls []models.ImageLink
	for rows.Next() {
		var imageId uuid.UUID
		var imageUrl string

		if err := rows.Scan(&imageId, &imageUrl); err != nil {
			return nil, err
		}
		imageUrls = append(imageUrls, models.ImageLink{
			ID:  imageId,
			Url: imageUrl,
		})
	}

	return imageUrls, err
}

func Invest(investorId uuid.UUID, db *pgxpool.Pool, projectId uuid.UUID, amount int32) error {
	// Get the current project to check for funding goal
	project, err := GetProjectById(db, projectId)
	if err != nil {
		return err
	}

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
		_, err = db.Exec(context.Background(),
			`INSERT INTO investor_investments (project_id, investor_id, funded_cents) 
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

func GetProjectPosts(projectId uuid.UUID, db *pgxpool.Pool, limit int, offset int) ([]models.ProjectPost, error) {
	rows, err := db.Query(
		context.Background(),
		"SELECT id, created_at, project_id, title, description FROM project_posts WHERE project_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
		projectId, limit, offset)
	if err != nil {
		return nil, err
	}

	projectPosts := []models.ProjectPost{}
	defer rows.Close()

	for rows.Next() {
		var id uuid.UUID
		var createdAt time.Time
		var projectID uuid.UUID
		var title string
		var description string

		err = rows.Scan(&id,
			&createdAt,
			&projectID,
			&title,
			&description)
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return nil, &api_errors.UUID_NOT_FOUND
			}

			return nil, err
		}

		images, err := GetProjectPostImages(db, id)
		if err != nil {
			return nil, err
		}

		projectPosts = append(projectPosts, models.ProjectPost{
			ID:          id,
			CreatedAt:   createdAt,
			ProjectID:   projectID,
			Title:       title,
			Description: description,
			Images:      images,
		})
	}
	return projectPosts, nil
}

func GetProjectPostImages(db *pgxpool.Pool, id uuid.UUID) ([]models.ImageLink, error) {
	rows, err := db.Query(context.Background(), `SELECT id, image_url FROM project_post_images WHERE post_id = $1;`, id)
	if err != nil {
		return nil, err
	}

	var imageUrls []models.ImageLink
	for rows.Next() {
		var imageId uuid.UUID
		var imageUrl string

		if err := rows.Scan(&imageId, &imageUrl); err != nil {
			return nil, err
		}
		imageUrls = append(imageUrls, models.ImageLink{
			ID:  imageId,
			Url: imageUrl,
		})
	}

	return imageUrls, err
}
