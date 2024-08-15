package types

import "github.com/gofiber/fiber/v2"

type RouterParams struct {
	Router        fiber.Router
	ServiceParams *ServiceParams
}
