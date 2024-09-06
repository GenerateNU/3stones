package setup

import (
	"backend/ent"
	"backend/internal/config"
	"backend/internal/routes"
	"backend/internal/types"
	"backend/internal/utilities"
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupServer(config *config.Config) (*fiber.App, error) {
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

	// Setup routes
	router := app.Group("/api/v1")

	routerParams := types.RouterParams{
		Router: router,
		Config: config,
		ServiceParams: &types.ServiceParams{
			DB: db,
		},
	}

	// Initialize routes here! VVVV
	routes.Contributors(routerParams)

	return app, nil
}
