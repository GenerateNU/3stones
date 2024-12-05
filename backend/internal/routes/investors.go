package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Investors(params types.RouterParams) {
	investorsController := controllers.NewInvestorsController(params.ServiceParams)

	// api/v1/investors/*
	investors := params.Router.Group("/investors")
	investors.Get("/profile", params.Auth.Middleware(), investorsController.GetProfile)
	investors.Post("/profile", params.Auth.Middleware(), investorsController.CreateProfile)
	investors.Put("/profile", params.Auth.Middleware(), investorsController.UpdateProfile)
	investors.Get("/portfolio", params.Auth.Middleware(), investorsController.GetPortfolio)
	investors.Get("/history", params.Auth.Middleware(), investorsController.GetHistory)
	investors.Get("/", params.Auth.Middleware(), investorsController.GetInvestor)
	investors.Get("/balance", params.Auth.Middleware(), investorsController.GetCashBalance)
}
