package main

import (
	"flag"
	"fmt"

	"backend/config"
	"backend/utilities"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Configuration - get the config path (if specified) and parse
	configPath := parseFlags()
	config, err := config.ParseConfiguration(*configPath)

	if err != nil {
		utilities.Exit("Error getting configuration: %s", err.Error())
	}

	// Setup app
	app := fiber.New()

	if err := app.Listen(fmt.Sprintf("%s:%d", config.Application.Host, config.Application.Port)); err != nil {
		utilities.Exit("Failed to start server: %v", err)
	}
}

func parseFlags() (configPath *string) {
	configPath = flag.String("config", "../config/.env.template", "Specify the path to the config file (.env)")
	flag.Parse()
	return
}
