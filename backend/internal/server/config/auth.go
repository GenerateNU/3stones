package config

type AuthConfig struct {
	SupabaseKey string `env:"SUPABASE_KEY"`
	SupabaseUrl string `env:"SUPABASE_URL"`
}
