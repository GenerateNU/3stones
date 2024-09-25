package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
)

type ProjectsController struct {
	ServiceParams *types.ServiceParams
}

func NewProjectsController(serviceParams *types.ServiceParams) *ProjectsController {
	return &ProjectsController{
		ServiceParams: serviceParams,
	}
}

func (c *ProjectsController) GetProjects(ctx *fiber.Ctx) error {
	projects, err := transactions.GetProjects(c.ServiceParams.DB)
	if err != nil {
		return &api_errors.INTERNAL_SERVER_ERROR
	}

	return ctx.JSON(projects)
}
