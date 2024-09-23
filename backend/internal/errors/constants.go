package errors

// Define error constants here! VVVV
var (
	UNAUTHORIZED          = NewApiError(400, "unauthorized")
	INTERNAL_SERVER_ERROR = NewApiError(500, "internal_server_error")
)
