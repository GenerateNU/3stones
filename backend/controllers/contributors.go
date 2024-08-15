package controllers

import (
	"backend/types"

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
	return ctx.SendStatus(404)
}
