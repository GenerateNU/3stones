package main

import (
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

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
	go func() {
		if err := app.Listen(fmt.Sprintf(":%d", config.Application.Port)); err != nil {
			utilities.Exit("Failed to start server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	<-quit

	slog.Info("Shutting down server")
	if err := app.Shutdown(); err != nil {
		slog.Error("failed to shutdown server", "error", err)
	}

	slog.Info("Server shutdown")
}
