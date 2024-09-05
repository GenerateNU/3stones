package types

import (
	"backend/internal/server/ent"
)

type ServiceParams struct {
	DB *ent.Client
}
