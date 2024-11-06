package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/ctxt"
	"backend/internal/models"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
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
	id, ok := ctxt.GetUserID(ctx)
	if !ok {
		return &api_errors.UUID_NOT_FOUND
	}

	investorProfile, err := transactions.GetProfile(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(investorProfile)
}

func (c *InvestorsController) GetPortfolio(ctx *fiber.Ctx) error {
	id, ok := ctxt.GetUserID(ctx)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	investors, err := transactions.GetPortfolio(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	return ctx.JSON(investors)
}

func (c *InvestorsController) GetHistory(ctx *fiber.Ctx) error {
	id, ok := ctxt.GetUserID(ctx)
	if !ok {
		return &api_errors.UUID_NOT_FOUND
	}

	paginationParams := new(types.PaginationParams)
	if err := ctx.QueryParser(paginationParams); err != nil {
		return &api_errors.PAGINATION_ERROR
	}

	investors, err := transactions.GetHistory(c.ServiceParams.DB, id, paginationParams.Limit, paginationParams.Offset)
	if err != nil {
		return err
	}

	return ctx.JSON(investors)
}

func (c *InvestorsController) GetInvestor(ctx *fiber.Ctx) error {
	id, ok := ctxt.GetUserID(ctx)
	if !ok {
		return &api_errors.UUID_NOT_FOUND
	}

	paginationParams := new(types.PaginationParams)
	if err := ctx.QueryParser(paginationParams); err != nil {
		return &api_errors.PAGINATION_ERROR
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

	investor := models.Investor{
		ID:                    id,
		FirstName:             profile.FirstName,
		LastName:              profile.LastName,
		TotalInvestmentAmount: totalValue,
		InvestmentBreakdown:   investments,
	}

	return ctx.Status(fiber.StatusOK).JSON(investor)
}
