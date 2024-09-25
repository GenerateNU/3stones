package models

import "github.com/google/uuid"

type Developer struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Premise     string    `json:"premise"`
	Street      string    `json:"street"`
	Locality    string    `json:"locality"`
	State       string    `json:"state"`
	Zipcode     string    `json:"zipcode"`
}
