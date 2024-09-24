package errors

import "github.com/gofiber/fiber/v2"

type ApiError struct {
	Code    int
	Message string
}

func NewApiError(Code int, Message string) ApiError {
	return ApiError{
		Code:    Code,
		Message: Message,
	}
}

// Send the given error.
func (a ApiError) Send(ctx *fiber.Ctx) error {
	return ctx.Status(a.Code).JSON(fiber.Map{"message": a.Message})
}
