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
	Milestone        string      `json:"milestone"`
	Premise          string      `json:"premise"`
	Street           string      `json:"street"`
	Locality         string      `json:"locality"`
	State            string      `json:"state"`
	Zipcode          string      `json:"zipcode"`
	Latitude         float32     `json:"latitude"`
	Longitude        float32     `json:"longitude"`
	Images           []ImageLink `json:"images"`
	CompletionDate   string      `json:"completion_date"`
}

type InvestRequestBody struct {
	Amount int32 `json:"amount"`
}

type SearchRequestBody struct {
	Query string `json:"query"`
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
