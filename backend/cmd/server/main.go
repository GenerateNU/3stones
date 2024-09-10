package main

import (
	"fmt"

	"backend/internal/config"
	"backend/internal/setup"
	"backend/internal/utilities"

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
	app, err := setup.SetupServer(config)
	if err != nil {
		utilities.Exit("Failed to setup server: %v", err)
	}

	// Listen for connections
	if err := app.Listen(fmt.Sprintf("%s:%d", config.Application.Host, config.Application.Port)); err != nil {
		utilities.Exit("Failed to start server: %v", err)
	}
}
