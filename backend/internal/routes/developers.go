package routes

import (
	"backend/internal/auth"
	"backend/internal/controllers"
	"backend/internal/types"
)

func Developers(params types.RouterParams) {
	developersController := controllers.NewDevelopersController(params.ServiceParams)

	// api/v1/developers/*
	developers := params.Router.Group("/developers")

	developers.Get("/", auth.Authorized(&params.Config.Supabase), developersController.GetDevelopers)
}
