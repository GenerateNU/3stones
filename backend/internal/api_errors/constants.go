package api_errors

// Define error constants here! VVVV
var (
	UNAUTHORIZED              = NewClientError("unauthorized")
	INTERNAL_SERVER_ERROR     = NewServerError("internal_server_error")
	INVALID_UUID              = NewClientError("invalid_uuid")
	UUID_NOT_FOUND            = NewClientError("uuid_not_found")
	INVALID_INVESTMENT_AMOUNT = NewClientError("invalid_investment_amount")
	INVALID_REQUEST_BODY      = NewClientError("invalid_request_body")
	FUNDING_GOAL_EXCEEDED     = NewClientError("funding_goal_exceeded")
	PAGINATION_ERROR          = NewClientError("pagination_error")
)
