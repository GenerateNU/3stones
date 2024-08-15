package transactions

import (
	"backend/ent"
	"context"
)

func GetContributors(client *ent.Client) ([]*ent.Contributor, error) {
	return client.Contributor.Query().All(context.Background())
}
