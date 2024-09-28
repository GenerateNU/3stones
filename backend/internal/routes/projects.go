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
	projects.Get("/:id", params.Auth.Middleware(), projectsController.GetProjectById)
	projects.Get("/:id/invest", params.Auth.Middleware(), projectsController.PostInvestmentById)
}
