# Guiding Philosophy
[Cognitive load is what matters.](https://github.com/zakirullin/cognitive-load)

# For Windows Users
This guide assumes that you are using Linux/MacOS. If you are using Windows, please install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

# Prerequisites
- [Git](https://git-scm.com/)
- [Golang](https://go.dev/)
  - Install through the official website, don't rely on package manager
- A [Supabase](https://supabase.com/) account
  - You can use your Github account for this
- [NodeJS](https://nodejs.org/en/)
- Clone the repository by running `git clone git@github.com:GenerateNU/3stones.git`.

# Frontend Setup

0. Install [ExpoGo](https://expo.dev/go) on your mobile device

1. Run `cd frontend` to change to the frontend directory.

2. Run `npm install --global yarn` to install the Yarn package manager.

3. Run `npx expo install` to install all packages used in the project.

4. Run `npx expo start --tunnel` to run the frontend!

# Backend setup (using Supabase)
1. Let's first create a `.env.dev` file for you to store your configuration and environment secrets. Run `cp 3stones/config/.env.template 3stones/config/.env.dev`.

2. [Watch this video to install setup supabase](https://www.youtube.com/watch?v=UqpaVPfYO1k)

3. Run the backend by running `cd backend`, then `go run ./cmd/server/main.go`.

# Formatting
Make sure `gofumpt` is installed by running `go install mvdan.cc/gofumpt@latest`, then run `gofumpt -l -w .` with `backend` as your working directory.

# Linting
Make sure `golangci-lint` is installed by running `go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.61.0`, then run `golangci-lint run` with `backend` as your working directory.