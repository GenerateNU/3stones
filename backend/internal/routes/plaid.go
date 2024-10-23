package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func PlaidRoutes(params types.RouterParams) {
	plaidController := controllers.NewPlaidController(params.ServiceParams)

	// api/v1/plaid/*
	plaidGroup := params.Router.Group("/plaid")
	plaidGroup.Post("/create_link_token", params.Auth.Middleware(), plaidController.CreateLinkToken)
}
