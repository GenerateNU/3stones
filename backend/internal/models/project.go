package models

import "github.com/google/uuid"

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
