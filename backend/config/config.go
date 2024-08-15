package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

type Config struct {
	Application ApplicationConfig `envPrefix:"TS3_APPLICATION_"`
}

// Create a configuration, using environment variables defined in the shell
// and/or the .env file specified in path.
func ParseConfiguration(path string) (*Config, error) {
	if path != "" {
		if err := godotenv.Load(path); err != nil {
			return nil, fmt.Errorf("failed to load envvars: %s", err.Error())
		}
	}

	settings, err := env.ParseAs[Config]()
	if err != nil {
		return nil, fmt.Errorf("failed to parse envvars: %s", err.Error())
	}

	return &settings, nil
}
