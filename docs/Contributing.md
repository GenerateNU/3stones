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

2. Run `npx install yarn` to install the Yarn package manager.

3. Run `npx expo install` to install all packages used in the project.

4. Run `npx expo start --tunnel` to run the frontend!

# Backend setup (using Docker)
1. Let's first create a `.env.dev` file for you to store your configuration and environment secrets. Run `cp 3stones/config/.env.template 3stones/config/.env.dev`.

2. Install Docker on your computer. 
   - [Follow the instructions here](https://docs.docker.com/get-started/get-docker/)
   - If you're on Windows, [follow the instructions to enable the WSL2 backend here](https://docs.docker.com/desktop/wsl/).

3. Start the database by running `./start-database.sh`.
   - If you're on Linux/MacOS, you can do this by running `./scripts/start-database.sh` (from the `3stones` directory).
   - If you're on Windows, login into WSL2 by running `wsl` and then running `./scripts/start-database.sh` (from the `3stones` directory).