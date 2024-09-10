package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
)

func main() {
	// Check if golangci-lint is installed
	if _, err := exec.LookPath("golangci-lint"); err != nil {
		log.Fatal("golangci-lint is not installed. Please install it by running:\n go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.61.0")
	}

	// Set up the command to run golangci-lint
	cmd := exec.Command("golangci-lint", "run")

	// Pipe the output to the console
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Run the command
	err := cmd.Run()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error running golangci-lint: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Linting complete!")
}
