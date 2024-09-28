package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/models"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
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
		return err
	}

	return ctx.JSON(projects)
}

func (c *ProjectsController) GetProjectById(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	project, err := transactions.GetProjectById(c.ServiceParams.DB, id)
	if err != nil {
		return err
	}

	return ctx.JSON(project)
}

// TODO: return custom error message
func (c *ProjectsController) PostInvestmentById(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	investRequestBody := new(models.InvestRequestBody)

	if err := ctx.BodyParser(investRequestBody); err != nil {
		return err
	}

	id, err := uuid.Parse(idParam)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	transactions.PostInvestmentById(ctx, c.ServiceParams.DB, id, investRequestBody.Amount)
	if err != nil {
		return nil
	}

	return ctx.JSON(200)
}
