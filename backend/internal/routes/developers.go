package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Developers(params types.RouterParams) {
	developersController := controllers.NewDevelopersController(params.ServiceParams)

	// api/v1/developers/*
	developers := params.Router.Group("/developers")

	developers.Get("/", params.Auth.Middleware(), developersController.GetDevelopers)
	developers.Get("/:id", params.Auth.Middleware(), developersController.GetDeveloperById)
}
