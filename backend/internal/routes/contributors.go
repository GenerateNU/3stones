package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Contributors(params types.RouterParams) {
	contributorsController := controllers.NewContributorsController(params.ServiceParams)

	// api/v1/contributors/*
	contributors := params.Router.Group("/contributors")

	contributors.Get("/", params.Auth.Middleware(), contributorsController.GetContributors)
}
