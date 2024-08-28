package jsontypes

type UserCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequestBody = UserCredentials
type RegisterRequestBody = UserCredentials

type AuthTokens struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type LoginResponseBody = AuthTokens
type RegisterResponseBody = AuthTokens
