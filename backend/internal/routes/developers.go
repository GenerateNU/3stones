package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func Developers(params types.RouterParams) {
	developersController := controllers.NewDevelopersController(params.ServiceParams)

	// api/v1/developers/{id}
	developers := params.Router.Group("/developers")

	developers.Get("/:id", params.Auth.Middleware(), developersController.GetDeveloperById)
}
