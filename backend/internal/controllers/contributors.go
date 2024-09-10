package controllers

import (
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
	contributors, err := transactions.GetContributors(c.ServiceParams.DB)
	if err != nil {
		return ctx.SendStatus(500)
	}

	return ctx.JSON(contributors)
}
