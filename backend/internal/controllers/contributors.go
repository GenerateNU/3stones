package controllers

import (
	"backend/internal/errors"
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
		return errors.INTERNAL_SERVER_ERROR.Send(ctx)
	}

	return ctx.JSON(contributors)
}
