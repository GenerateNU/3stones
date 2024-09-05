package types

import (
	"backend/internal/server/config"

	"github.com/gofiber/fiber/v2"
)

type RouterParams struct {
	Router        fiber.Router
	Config        *config.Config
	ServiceParams *ServiceParams
}
