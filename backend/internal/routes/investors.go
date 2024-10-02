package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Investors(params types.RouterParams) {
	investorsController := controllers.NewInvestorsController(params.ServiceParams)

	// api/v1/investors/*
	investors := params.Router.Group("/investors")

	// investors.Get("/portfolio/:id", params.Auth.Middleware(), investorsController.GetPortfolio)
	investors.Get("/portfolio", params.Auth.Middleware(), investorsController.GetPortfolio)
}
