package config

import (
	"flag"
	"os"
)

func ParseFlags() (configPath *string) {
	if os.Getenv("APP_ENVIRONMENT") != "production" {
		configPath = flag.String("config", "../config/.env.dev", "Specify the path to the config file (.env)")
		flag.Parse()
	} else {
		configPath = new(string)
		*configPath = ""
	}

	return
}
