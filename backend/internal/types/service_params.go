package types

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

type ServiceParams struct {
	DB *pgxpool.Pool
}
