package models

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	ID               uuid.UUID   `json:"id"`
	DeveloperID      uuid.UUID   `json:"developer_id"`
	Title            string      `json:"title"`
	Description      string      `json:"description"`
	Completed        bool        `json:"completed"`
	FundingGoalCents int32       `json:"funding_goal_cents"`
	Premise          string      `json:"premise"`
	Street           string      `json:"street"`
	Locality         string      `json:"locality"`
	State            string      `json:"state"`
	Zipcode          string      `json:"zipcode"`
	Images           []ImageLink `json:"images"`
}

type InvestRequestBody struct {
	Amount int32 `json:"amount"`
}

type ProjectPost struct {
	ID          uuid.UUID   `json:"id"`
	CreatedAt   time.Time   `json:"created_at"`
	ProjectID   uuid.UUID   `json:"project_id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Images      []ImageLink `json:"images"`
}

type ImageLink struct {
	ID  uuid.UUID `json:"id"`
	Url string    `json:"url"`
}
