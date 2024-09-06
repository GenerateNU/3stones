package types

import (
	"backend/internal/config"

	"github.com/gofiber/fiber/v2"
)

type RouterParams struct {
	Router        fiber.Router
	Config        *config.Config
	ServiceParams *ServiceParams
}
