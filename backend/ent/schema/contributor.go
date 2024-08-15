package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Contributor holds the schema definition for the Contributor entity.
type Contributor struct {
	ent.Schema
}

// Fields of the Contributor.
func (Contributor) Fields() []ent.Field {
	return []ent.Field{
		field.String("first_name"),
		field.String("last_name"),
		field.String("email").Unique(),
	}
}

// Edges of the Contributor.
func (Contributor) Edges() []ent.Edge {
	return nil
}
