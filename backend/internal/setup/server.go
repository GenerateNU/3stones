package setup

import (
	"context"

	"backend/internal/config"
	"backend/internal/routes"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SetupServer(config *config.Config) (*fiber.App, error) {
	// Setup app
	app := fiber.New()

	app.Use(logger.New())

	// Setup db
	db, err := pgxpool.New(context.Background(), config.Database.Url)
	if err != nil {
		return nil, err
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
	routes.Projects(routerParams)

	return app, nil
}
