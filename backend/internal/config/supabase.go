package config

type SupabaseConfig struct {
	JwtSecret string `env:"JWT_SECRET"`
	Url       string `env:"PROJECT_URL"`
	ApiKey    string `env:"API_KEY"`
}
