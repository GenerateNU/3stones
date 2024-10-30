package api_errors

var (
	UNAUTHORIZED                                = NewClientError("unauthorized")
	INTERNAL_SERVER_ERROR                       = NewServerError("internal_server_error")
	INVALID_UUID                                = NewClientError("invalid_uuid")
	UUID_NOT_FOUND                              = NewClientError("uuid_not_found")
	INVALID_INVESTMENT_AMOUNT                   = NewClientError("invalid_investment_amount")
	INVALID_REQUEST_BODY                        = NewClientError("invalid_request_body")
	FUNDING_GOAL_EXCEEDED                       = NewClientError("funding_goal_exceeded")
	PAGINATION_ERROR                            = NewClientError("invalid_pagination_params")
	MISSING_FIELDS                              = NewClientError("missing_fields")
	ACCESS_TOKEN_NOT_FOUND                      = NewClientError("access_token_not_found")
	INVALID_TRANSFER_TYPE                       = NewClientError("invalid_transfer_type")
	INVALID_ACH_CLASS                           = NewClientError("invalid_ach_class")
	TRANSFER_AUTHORIZATION_DECLINED             = NewClientError("transfer_authorization_declined")
	TRANSFER_AUTHORIZATION_USER_ACTION_REQUIRED = NewClientError("transfer_authorization_user_action_required")
	TRANSFER_AUTHORIZATION_FAILED               = NewServerError("transfer_authorization_failed")
)
