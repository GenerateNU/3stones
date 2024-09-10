package config

type ApplicationConfig struct {
	Port uint16 `env:"PORT"`
	Host string `env:"HOST"`
}
