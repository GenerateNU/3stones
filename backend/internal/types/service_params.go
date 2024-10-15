package types

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/plaid/plaid-go/v29/plaid"
)

type ServiceParams struct {
	DB    *pgxpool.Pool
	Plaid *plaid.APIClient
}
