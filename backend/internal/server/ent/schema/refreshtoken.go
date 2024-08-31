package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// RefreshToken holds the schema definition for the RefreshToken entity.
type RefreshToken struct {
	ent.Schema
}

// Fields of the RefreshToken.
func (RefreshToken) Fields() []ent.Field {
	return []ent.Field{
		field.String("refresh_token_hash").NotEmpty(),
	}
}

// Edges of the RefreshToken.
func (RefreshToken) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user", User.Type).
			Unique(),
	}
}
