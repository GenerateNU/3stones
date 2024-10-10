package config

type PlaidConfig struct {
	ClientId string `env:"CLIENT_ID"`
	Secret   string `env:"SECRET"`
}
