package transactions

import (
	"context"

	"backend/ent"
)

func GetContributors(client *ent.Client) ([]*ent.Contributor, error) {
	return client.Contributor.Query().All(context.Background())
}
