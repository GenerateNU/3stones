package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
)

type ContributorsController struct {
	ServiceParams *types.ServiceParams
}

func NewContributorsController(ServiceParams *types.ServiceParams) *ContributorsController {
	return &ContributorsController{
		ServiceParams: ServiceParams,
	}
}

func (c *ContributorsController) GetContributors(ctx *fiber.Ctx) error {
	contributors, err := transactions.GetContributors(ctx.Context(), c.ServiceParams.DB)
	if err != nil {
		return &api_errors.INTERNAL_SERVER_ERROR
	}

	return ctx.JSON(contributors)
}
