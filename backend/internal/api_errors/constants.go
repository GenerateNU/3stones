package api_errors

// Define error constants here! VVVV
var (
	UNAUTHORIZED          = NewClientError("unauthorized")
	INTERNAL_SERVER_ERROR = NewServerError("internal_server_error")
	INVALID_UUID          = NewClientError("invalid_uuid")
	UUID_NOT_FOUND        = NewClientError("uuid_not_found")
)
