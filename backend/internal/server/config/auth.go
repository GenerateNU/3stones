package config

type AuthConfig struct {
	SUPABASE_JWT_SECRET string `env:"SUPABASE_JWT_SECRET"`
	SUPABASE_URL        string `env:"SUPABASE_PROJECT_URL"`
	SUPABASE_API_KEY    string `env:"SUPABASE_API_KEY"`
}
