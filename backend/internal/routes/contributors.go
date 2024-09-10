package routes

import (
	"backend/internal/auth"
	"backend/internal/controllers"
	"backend/internal/types"
)

func Contributors(params types.RouterParams) {
	contributorsController := controllers.NewContributorsController(params.ServiceParams)

	// api/v1/contributors/*
	contributors := params.Router.Group("/contributors")

	contributors.Get("/", auth.Authorized(&params.Config.Supabase), contributorsController.GetContributors)
}
