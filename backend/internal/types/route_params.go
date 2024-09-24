package types

import (
	"backend/internal/auth"
	"backend/internal/config"

	"github.com/gofiber/fiber/v2"
)

type RouterParams struct {
	Auth          *auth.AuthFactory
	Router        fiber.Router
	Config        *config.Config
	ServiceParams *ServiceParams
}
