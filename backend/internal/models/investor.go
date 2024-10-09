package models

import "github.com/google/uuid"

type Investor struct {
	ID                    uuid.UUID         `json:"id"`
	FirstName             string            `json:"first"`
	LastName              string            `json:"last"`
	TotalInvestmentAmount int               `json:"total_investment_amount"`
	InvestmentBreakdown   map[uuid.UUID]int `json:"investment_breakdown"`
}

type InvestorProfile struct {
	FirstName string `json:"first"`
	LastName  string `json:"last"`
}
