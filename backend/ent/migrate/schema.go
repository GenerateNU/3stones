// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// ContributorsColumns holds the columns for the "contributors" table.
	ContributorsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "first_name", Type: field.TypeString},
		{Name: "last_name", Type: field.TypeString},
		{Name: "email", Type: field.TypeString, Unique: true},
	}
	// ContributorsTable holds the schema information for the "contributors" table.
	ContributorsTable = &schema.Table{
		Name:       "contributors",
		Columns:    ContributorsColumns,
		PrimaryKey: []*schema.Column{ContributorsColumns[0]},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		ContributorsTable,
	}
)

func init() {
}