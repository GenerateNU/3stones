package types

import (
	"backend/internal/server/auth"
	"backend/internal/server/ent"
)

type ServiceParams struct {
	DB   *ent.Client
	Auth *auth.Auth
}
