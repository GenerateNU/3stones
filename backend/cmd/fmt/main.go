package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func main() {
	// Get all Go files in the current directory and subdirectories
	var gofiles []string
	err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && strings.HasSuffix(path, ".go") {
			gofiles = append(gofiles, path)
		}
		return nil
	})
	if err != nil {
		log.Fatalf("Error walking the directory: %v\n", err)
	}

	// Exit if no Go files are found
	if len(gofiles) == 0 {
		os.Exit(0)
	}

	// Check for unformatted Go files
	cmd := exec.Command("gofmt", "-l")
	cmd.Args = append(cmd.Args, gofiles...)
	output, err := cmd.Output()
	if err != nil {
		log.Fatalf("Failed to run gofmt: %v\n", err)
	}

	unformatted := strings.Split(strings.TrimSpace(string(output)), "\n")

	// Exit if all files are formatted
	if len(unformatted) == 1 && unformatted[0] == "" {
		os.Exit(0)
	}

	fmt.Fprintln(os.Stderr, "Files need to be formatted. Please run:\ngo fmt ./...")

	// Fail the commit
	os.Exit(1)
}
