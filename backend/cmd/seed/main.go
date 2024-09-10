package main

import (
	"context"
	"fmt"

	"backend/ent"
	"backend/internal/config"
	"backend/internal/utilities"

	_ "github.com/lib/pq"
)

func main() {
	// Configuration - get the config path (if specified) and parse
	configPath := config.ParseFlags()
	config, err := config.ParseConfiguration(*configPath)

	if err != nil {
		utilities.Exit("Error getting configuration: %s", err.Error())
	}

	// Setup database connection
	db, err := setupDatabase(config)
	if err != nil {
		utilities.Exit("Failed to setup database: %v", err)
	}
	defer db.Close()

	seedDatabase(db)

	fmt.Println("Seeding completed successfully")
}

func setupDatabase(config *config.Config) (*ent.Client, error) {
	db, err := ent.Open("postgres", config.Database.Url)
	if err != nil {
		return nil, err
	}

	// Run auto-migration (ensure SQL tables conform to our schema)
	if err := db.Schema.Create(context.Background()); err != nil {
		utilities.Exit("Failed to create schema resources: %v", err)
	}

	return db, nil
}

// TODO: PUT SEEDING DATA HERE! The more seed data the better testing and debugging you can (probably) do.
// Also these calls (for now) can be SaveX vs. Save (panic instead of properly returning error)
func seedDatabase(db *ent.Client) {
	// Add contributors
	db.Contributor.Create().SetFirstName("Michael").SetLastName("Brennan").SetEmail("brennan.mic@northeastern.edu").SaveX(context.Background())
	db.Contributor.Create().SetFirstName("Ryan").SetLastName("Saperstein").SetEmail("saperstein.ry@northeastern.edu").SaveX(context.Background())
}
