package main

import (
	"backend/internal/server/config"
	"backend/internal/server/utilities"
	"context"
	"flag"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/nedpals/supabase-go"
)

func main() {
	// Configuration - get the config path (if specified) and parse
	configPath := config.ParseFlags()
	config, err := config.ParseConfiguration(*configPath)

	args := flag.Args()
	if len(args) < 2 || args[0] == "" || args[1] == "" {
		utilities.Exit("Expected email and password, in that order.")
	}

	email := args[0]
	password := args[1]

	if err != nil {
		utilities.Exit("Error getting configuration: %s", err.Error())
	}

	// Create supabase client
	client := supabase.CreateClient(config.Supabase.Url, config.Supabase.ApiKey)

	details, err := client.Auth.SignIn(context.Background(), supabase.UserCredentials{
		Email:    email,
		Password: password,
		Data:     nil,
	})

	if err != nil {
		utilities.Exit("Error signing in: %s", err.Error())
	}

	fmt.Printf("Access token:\n%s\nRefresh token:\n%s\nCheers!", details.AccessToken, details.RefreshToken)
}
