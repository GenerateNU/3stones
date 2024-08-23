package routes

import (
	"backend/internal/server/controllers"
	"backend/internal/server/types"
)

func Contributors(params types.RouterParams) {
	contributorsController := controllers.NewContributorsController(params.ServiceParams)
	// api/v1/contributors/*
	contributors := params.Router.Group("/contributors")

	contributors.Get("/", contributorsController.GetContributors)
}
