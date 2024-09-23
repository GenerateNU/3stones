package errors

import "github.com/gofiber/fiber/v2"

type ApiError struct {
	// 200 - Request completed successfully
	// 400 - Requester messed something up (unauthorized, unknown id, etc.)
	// 500 - Server messed something up (internal error, etc.)
	Code int
	// Formatting should be camel case, i.e "jwt_has_expired","no_user_found",etc.
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
