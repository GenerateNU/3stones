package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func PlaidRoutes(params types.RouterParams) {
	plaidLoginController := controllers.NewPlaidLoginController(params.ServiceParams)
	plaid := params.Router.Group("/plaid")
	plaid.Post("/link-token", params.Auth.Middleware(), plaidLoginController.CreateLinkToken)
}
