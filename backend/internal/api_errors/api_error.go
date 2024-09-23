package api_errors

import (
	"fmt"
)

type ApiError struct {
	Code    int
	Message string
}

func NewClientError(Message string) ApiError {
	return ApiError{
		Code:    400,
		Message: Message,
	}
}

func NewServerError(Message string) ApiError {
	return ApiError{
		Code:    500,
		Message: Message,
	}
}

// So we can use this as an `error` value.
func (a *ApiError) Error() string {
	return fmt.Sprintf("%d - %s", a.Code, a.Message)
}
