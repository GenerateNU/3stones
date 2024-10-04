package models

import "github.com/google/uuid"
import "time"

type Project struct {
	ID               uuid.UUID `json:"id"`
	DeveloperID      uuid.UUID `json:"developer_id"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
	Completed        bool      `json:"completed"`
	FundingGoalCents int32     `json:"funding_goal_cents"`
	Premise          string    `json:"premise"`
	Street           string    `json:"street"`
	Locality         string    `json:"locality"`
	State            string    `json:"state"`
	Zipcode          string    `json:"zipcode"`
}

type InvestRequestBody struct {
	Amount int32 `json:"amount"`
}

type ProjectPost struct {
	ID               uuid.UUID `json:"id"`
	CreatedAt 		 time.Time `json:"created_at"`
	ProjectID        uuid.UUID `json:"project_id"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
}