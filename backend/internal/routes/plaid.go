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
	plaidGroup.Post("/exchange_public_token", params.Auth.Middleware(), plaidController.ExchangePublicToken)
	plaidGroup.Post("/invest", params.Auth.Middleware(), plaidController.Invest)
	plaidGroup.Post("/deposit", params.Auth.Middleware(), plaidController.Deposit)
	plaidGroup.Post("/withdraw", params.Auth.Middleware(), plaidController.Withdraw)
}
