package main

import (
	"database/sql"
	"fmt"

	"backend/internal/server/config"
	"backend/internal/server/utilities"

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

	if resetDatabase(db) != nil {
		utilities.Exit("Failed to reset database: %v", err)
	}

	fmt.Println("Reset completed successfully")
}

func setupDatabase(config *config.Config) (*sql.DB, error) {
	db, err := sql.Open("postgres", config.Database.Url)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func resetDatabase(db *sql.DB) error {
	// Disable foreign key checks temporarily
	_, err := db.Exec(`SET session_replication_role = 'replica';`)
	if err != nil {
		return fmt.Errorf("failed to disable foreign key checks: %v", err)
	}

	// Get all tables and drop them
	rows, err := db.Query(`
        SELECT tablename FROM pg_tables WHERE schemaname = 'public';
    `)
	if err != nil {
		return fmt.Errorf("failed to fetch table names: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var tableName string
		if err := rows.Scan(&tableName); err != nil {
			return fmt.Errorf("failed to scan table name: %v", err)
		}

		_, err = db.Exec(fmt.Sprintf("DROP TABLE IF EXISTS %s CASCADE;", tableName))
		if err != nil {
			return fmt.Errorf("failed to drop table %s: %v", tableName, err)
		}
	}

	_, err = db.Exec(`SET session_replication_role = 'origin';`)
	if err != nil {
		return fmt.Errorf("failed to re-enable foreign key checks: %v", err)
	}

	return nil
}
