package controllers

import (
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

func (c *DevelopersController) GetDevelopers(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString("Invalid UUID")
	}

	developers, err := transactions.GetDevelopers(c.ServiceParams.DB, id)
	if err != nil {
		return ctx.SendStatus(500)
	}

	return ctx.JSON(developers)
}
