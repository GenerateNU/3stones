# Guiding Philosophy

[Cognitive load is what matters.](https://github.com/zakirullin/cognitive-load)

# For Windows Users

This guide assumes that you are using Linux/MacOS. If you are using Windows, please install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

# Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-started/get-docker/)
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

3. Run `yarn add expo`

4. Run `npx expo install` to install all packages used in the project.

5. Follow steps 1-4 on [this guide](https://ngrok.com/docs/getting-started/) to install and configure `ngrok`, which we will use to connect from the frontend to the API.

6. Create a file `.env` to store environment variables. Run `cp ./.env.template ./.env`.

7. To get your auth token, run `go run ../backend/cmd/login/main.go [username] [password]` AFTER setting up the backend and following the steps in the SupaBase setup video.

8. Run `npx expo start --tunnel` to run the frontend! If this doesn't work, try running `npx expo start`

# Backend setup (using Supabase)

1. Let's first create a `.env.dev` file for you to store your configuration and environment secrets. Run `cp 3stones/config/.env.template 3stones/config/.env.dev`.

2. These next commands will take place with `backend` as your working directory, so run `cd backend`.

3. Install the Supabase local CLI with `npm i`.

4. Run `npx supabase start -x vector` to start your Supabase services; after a minute or so, it should return an output like this:

```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
   S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
       S3 Region: local
```

From this:

- Copy the `API URL` value to the `TS3_SUPABASE_PROJECT_URL` key in `.env.dev`.
- Copy the `DB URL` value to the `TS3_DATABASE_URL` key in `.env.dev`.
- Copy the `JWT secret` value to the `TS3_SUPABASE_JWT_SECRET` key in `.env.dev`.
- Copy the `anon key` value to the `TS3_SUPABASE_API_KEY` key in `.env.dev`.

**Also of note**: The `Studio URL` will take you to a Supabase dashboard hosted locally on your computer, which is where you can create users, and use their SQL and table editor.

5. Run `go run ./cmd/server/main.go`.

# Useful backend commands

These are all run with `backend` as your working directory.

```
# Start the server
go run ./cmd/server/main.go

# Start supabase services
npx supabase start -x vector

# Stop supabase services
npx supabase stop

# Reset database (after you've added seed data, modified tables, etc.)
npx supabase db reset

# Format all files (make sure you have gofumpt installed)
gofumpt -l -w .

# Run linters
golangci-lint run
```

# Contributing guidelines

1. **Open PRs as early as possible.** This allows us to give you feedback and help earlier.
2. **Keep your branch as up-to-date with main as possible.** The earlier and more frequent you are updating your feature branch with changes from main the less weird merge conflicts and less extra work you will have to do.
3. **Submit video walkthroughs of you running your endpoint on PRs.**
4. **Branch names should be \<JIRA-TICKET\>-\<DESCRIPTOR\>**, i.e _SCRUM-1-get-developers_ or _SCRUM-10-database-fixes_.
