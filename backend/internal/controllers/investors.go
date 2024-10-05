package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/models"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type InvestorsController struct {
	ServiceParams *types.ServiceParams
}

func NewInvestorsController(ServiceParams *types.ServiceParams) *InvestorsController {
	return &InvestorsController{
		ServiceParams: ServiceParams,
	}
}

func (c *InvestorsController) GetProfile(ctx *fiber.Ctx) error {
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	investorProfile, err := transactions.GetProfile(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	return ctx.JSON(investorProfile)
}

func (c *InvestorsController) GetPortfolio(ctx *fiber.Ctx) error {
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	investors, err := transactions.GetPortfolio(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	return ctx.JSON(investors)
}

func (c *InvestorsController) GetInvestor(ctx *fiber.Ctx) error {
	userId, ok := ctx.Locals("userId").(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	profile, err := transactions.GetProfile(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	totalValue, err := transactions.GetTotalPortfolioValue(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	investments, err := transactions.GetPortfolio(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	var investor = models.Investor{
		ID:                    id,
		FirstName:             profile.FirstName,
		LastName:              profile.LastName,
		TotalInvestmentAmount: totalValue,
		InvestmentBreakdown:   investments,
	}

	return ctx.JSON(investor)
}
