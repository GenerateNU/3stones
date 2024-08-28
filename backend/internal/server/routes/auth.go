package routes

import (
	"backend/internal/server/controllers"
	"backend/internal/server/types"
)

func Auth(params types.RouterParams) {
	authController := controllers.NewAuthController(params.ServiceParams)
	// api/v1/auth/*
	auth := params.Router.Group("/auth")

	auth.Post("/login", authController.Login)
	auth.Post("/register", authController.Register)

	auth.Post("/logout", authController.Logout)
}
