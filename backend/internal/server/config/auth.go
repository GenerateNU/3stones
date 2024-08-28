package config

type AuthConfig struct {
	AccessTokenSecret  string `env:"ACCESS_TOKEN_SECRET"`
	RefreshTokenSecret string `env:"REFRESH_TOKEN_SECRET"`
}
