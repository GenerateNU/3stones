package routes

import (
	"backend/internal/auth"
	"backend/internal/controllers"
	"backend/internal/types"
)

func Projects(params types.RouterParams) {
	projectsController := projects.NewProjectsController(params.ServiceParams)

	// api/v1/projects/*
	projects := params.Router.Group("/projects")

	projects.Get("/", auth.Authorized(&params.Config.Supabase), projectsController.GetProjects)
}
