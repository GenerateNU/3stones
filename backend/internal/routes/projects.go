package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
)

func Projects(params types.RouterParams) {
	projectsController := controllers.NewProjectsController(params.ServiceParams)

	// api/v1/projects/*
	projects := params.Router.Group("/projects")

	projects.Use("/search-projects", func(c *fiber.Ctx) error {
		c.Set("Allow", "POST, GET, HEAD")
		return c.Next()
	})

	projects.Get("/", params.Auth.Middleware(), projectsController.GetProjects)
	projects.Get("/:id", params.Auth.Middleware(), projectsController.GetProjectById)
	projects.Get("/:id/total-funded", params.Auth.Middleware(), projectsController.GetProjectTotalFunded)
	projects.Post("/:id/invest", params.Auth.Middleware(), projectsController.Invest)
	projects.Get("/:id/posts", params.Auth.Middleware(), projectsController.GetProjectPosts)
	projects.Post("/search-projects", params.Auth.Middleware(), projectsController.SearchProjects)
}
