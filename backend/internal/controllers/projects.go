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

func (c *ProjectsController) GetProjectTotalFunded(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := uuid.Parse(idParam)
func (c *ProjectsController) Invest(ctx *fiber.Ctx) error {
	projectIdParam := ctx.Params("id")
	investRequestBody := new(models.InvestRequestBody)

	// parses the incoming request body into the investRequestBody struct
	// returns an error if there was an issue such as missing fields
	if err := ctx.BodyParser(investRequestBody); err != nil {
		return &api_errors.INVALID_REQUEST_BODY
	}

	// Check if the amount sent is > 0, if not, return an error
	if investRequestBody.Amount <= 0 {
		return &api_errors.INVALID_INVESTMENT_AMOUNT
	}

	// Parses the projectid into a uuid form, returns an error if unable to convert
	projectId, err := uuid.Parse(projectIdParam)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	totalFunded, err := transactions.GetProjectTotalFunded(c.ServiceParams.DB, id)
	// extract investor id from locals context
	investorIdStringVal := ctx.Locals("userId")

	investorIdString, ok := investorIdStringVal.(string)
	if !ok {
		return &api_errors.INVALID_UUID
	}

	investorId, err := uuid.Parse(investorIdString)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	err = transactions.Invest(investorId, c.ServiceParams.DB, projectId, investRequestBody.Amount)
	if err != nil {
		return err
	}

	return ctx.JSON(totalFunded)
	// signals the request was successful / aka no errors
	return nil
}
