package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Projects(params types.RouterParams) {
	projectsController := controllers.NewProjectsController(params.ServiceParams)

	// api/v1/projects/*
	projects := params.Router.Group("/projects")

	projects.Get("/", params.Auth.Middleware(), projectsController.GetProjects)
	projects.Get("/:id/total-funded", params.Auth.Middleware(), projectsController.GetProjectTotalFunded)
}
