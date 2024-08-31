package main

import (
	"context"
	"fmt"

	"backend/internal/server/auth"
	"backend/internal/server/config"
	"backend/internal/server/ent"
	"backend/internal/server/routes"
	"backend/internal/server/types"
	"backend/internal/server/utilities"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	_ "github.com/lib/pq"
)

func main() {
	// Configuration - get the config path (if specified) and parse
	configPath := config.ParseFlags()
	config, err := config.ParseConfiguration(*configPath)

	if err != nil {
		utilities.Exit("Error getting configuration: %s", err.Error())
	}

	// Setup app
	app, err := setupServer(config)
	if err != nil {
		utilities.Exit("Failed to setup server: %v", err)
	}

	// Listen for connections
	if err := app.Listen(fmt.Sprintf("%s:%d", config.Application.Host, config.Application.Port)); err != nil {
		utilities.Exit("Failed to start server: %v", err)
	}
}

func setupServer(config *config.Config) (*fiber.App, error) {
	// Setup app
	app := fiber.New()

	app.Use(logger.New())

	// Setup singletons (db, auth)
	db, err := ent.Open("postgres", config.Database.Url)
	if err != nil {
		return nil, err
	}

	// Run auto-migration (ensure SQL tables conform to our schema)
	if err := db.Schema.Create(context.Background()); err != nil {
		utilities.Exit("Failed to create schema resources: %v", err)
	}

	auth := auth.NewAuth(config)

	// Setup routes
	router := app.Group("/api/v1")

	routerParams := types.RouterParams{
		Router: router,
		ServiceParams: &types.ServiceParams{
			DB:   db,
			Auth: auth,
		},
	}

	// Initialize routes here! VVVV
	routes.Contributors(routerParams)
	routes.Auth(routerParams)

	return app, nil
}
