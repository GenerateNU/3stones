package ctxt

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type userIDKey struct{}

func SetUserID(c *fiber.Ctx, userID uuid.UUID) {
	c.Locals(userIDKey{}, userID)
}

func GetUserID(c *fiber.Ctx) (userID uuid.UUID, ok bool) {
	userID, ok = c.Locals(userIDKey{}).(uuid.UUID)
	return
}
