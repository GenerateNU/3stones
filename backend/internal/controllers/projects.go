package controllers

import (
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
)

type ProjectsController struct {
	ServiceParams *types.ServiceParams
}

func NewProjectsontroller(ServiceParams *types.ServiceParams) *ProjectsController {
	return &ProjectsController{
		ServiceParams: ServiceParams,
	}
}

func (c *ProjectsController) GetProjects(ctx *fiber.Ctx) error {
	projects, err := transactions.GetProjects(c.ServiceParams.DB)
	if err != nil {
		return ctx.SendStatus(500)
	}

	return ctx.JSON(projects)
}
