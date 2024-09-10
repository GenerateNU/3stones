package config

import "flag"

func ParseFlags() (configPath *string) {
	configPath = flag.String("config", "../config/.env.dev", "Specify the path to the config file (.env)")
	flag.Parse()
	return
}
