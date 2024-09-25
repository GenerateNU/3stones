package controllers

import (
	"backend/internal/api_errors"
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type DevelopersController struct {
	ServiceParams *types.ServiceParams
}

func NewDevelopersController(ServiceParams *types.ServiceParams) *DevelopersController {
	return &DevelopersController{
		ServiceParams: ServiceParams,
	}
}

func (c *DevelopersController) GetDeveloperById(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		return &api_errors.INVALID_UUID
	}

	developers, err := transactions.GetDeveloperById(c.ServiceParams.DB, id)
	if err != nil {
		return &api_errors.INTERNAL_SERVER_ERROR
	}

	return ctx.JSON(developers)
}
