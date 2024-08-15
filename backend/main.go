package main

import (
	"context"
	"flag"
	"fmt"

	"backend/config"
	"backend/ent"
	"backend/routes"
	"backend/types"
	"backend/utilities"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	_ "github.com/lib/pq"
)

func main() {
	// Configuration - get the config path (if specified) and parse
	configPath := parseFlags()
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
	// Setup app, database, and router
	app := fiber.New()

	app.Use(logger.New())

	db, err := ent.Open("postgres", config.Database.ConnString())
	if err != nil {
		return nil, err
	}

	// Run auto-migration (ensure SQL tables conform to our schema)
	if err := db.Schema.Create(context.Background()); err != nil {
		utilities.Exit("Failed to create schema resources: %v", err)
	}

	router := app.Group("/api/v1")

	routerParams := types.RouterParams{
		Router: router,
		ServiceParams: &types.ServiceParams{
			DB: db,
		},
	}

	// Initialize routes here! VVVV
	routes.Contributors(routerParams)

	return app, nil
}

func parseFlags() (configPath *string) {
	configPath = flag.String("config", "../config/.env.dev", "Specify the path to the config file (.env)")
	flag.Parse()
	return
}
