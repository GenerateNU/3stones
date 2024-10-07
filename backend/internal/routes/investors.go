package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Investors(params types.RouterParams) {
	investorsController := controllers.NewInvestorsController(params.ServiceParams)

	// api/v1/investors/*
	investors := params.Router.Group("/investor")
	investors.Get("/profile", params.Auth.Middleware(), investorsController.GetProfile)

	investors.Get("/portfolio", params.Auth.Middleware(), investorsController.GetPortfolio)
	investors.Get("/", params.Auth.Middleware(), investorsController.GetInvestor)
}