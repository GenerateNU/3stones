# Access Tokens vs Refresh Tokens

- https://www.descope.com/blog/post/access-token-vs-refresh-token
- https://stackoverflow.com/questions/3487991/why-does-oauth-v2-have-both-access-and-refresh-tokens
- https://fullstack.wiki/oauth/index

Supabase effectively acts as our 'authorization' server - authentication actions can be sent directly to Supabase (via client libraries for Typescript, Go, etc.) and as long as our backend has the JWT secret key used to encrypt the tokens, it can authenticate users without making requests to Supabase. The frontend will use the Supabase client extensively for sending login, registering, logout, etc. actions, while the backend just uses a Supabase client for the login script in `cmd/seed/main.go`.

# Using Supabase as an Auth Service

[This gives a good overview/idea of how Supabase auth works in our case.](https://depshub.com/blog/using-supabase-auth-as-a-service-with-a-custom-backend/)
