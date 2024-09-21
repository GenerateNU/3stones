package controllers

import (
	"backend/internal/transactions"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
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
	developers, err := transactions.GetDevelopers(c.ServiceParams.DB)
	if err != nil {
		return ctx.SendStatus(500)
	}

	return ctx.JSON(developers)
}
