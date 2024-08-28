package types

type UserCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthTokens struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type RefreshRequestBody struct {
	RefreshToken string `json:"refresh_token"`
}
