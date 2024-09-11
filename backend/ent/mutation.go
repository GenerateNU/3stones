// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/ent/contributor"
	"backend/ent/predicate"
	"context"
	"errors"
	"fmt"
	"sync"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

const (
	// Operation types.
	OpCreate    = ent.OpCreate
	OpDelete    = ent.OpDelete
	OpDeleteOne = ent.OpDeleteOne
	OpUpdate    = ent.OpUpdate
	OpUpdateOne = ent.OpUpdateOne

	// Node types.
	TypeContributor = "Contributor"
)

// ContributorMutation represents an operation that mutates the Contributor nodes in the graph.
type ContributorMutation struct {
	config
	op            Op
	typ           string
	id            *int
	first_name    *string
	last_name     *string
	email         *string
	clearedFields map[string]struct{}
	done          bool
	oldValue      func(context.Context) (*Contributor, error)
	predicates    []predicate.Contributor
}

var _ ent.Mutation = (*ContributorMutation)(nil)

// contributorOption allows management of the mutation configuration using functional options.
type contributorOption func(*ContributorMutation)

// newContributorMutation creates new mutation for the Contributor entity.
func newContributorMutation(c config, op Op, opts ...contributorOption) *ContributorMutation {
	m := &ContributorMutation{
		config:        c,
		op:            op,
		typ:           TypeContributor,
		clearedFields: make(map[string]struct{}),
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

// withContributorID sets the ID field of the mutation.
func withContributorID(id int) contributorOption {
	return func(m *ContributorMutation) {
		var (
			err   error
			once  sync.Once
			value *Contributor
		)
		m.oldValue = func(ctx context.Context) (*Contributor, error) {
			once.Do(func() {
				if m.done {
					err = errors.New("querying old values post mutation is not allowed")
				} else {
					value, err = m.Client().Contributor.Get(ctx, id)
				}
			})
			return value, err
		}
		m.id = &id
	}
}

// withContributor sets the old Contributor of the mutation.
func withContributor(node *Contributor) contributorOption {
	return func(m *ContributorMutation) {
		m.oldValue = func(context.Context) (*Contributor, error) {
			return node, nil
		}
		m.id = &node.ID
	}
}

// Client returns a new `ent.Client` from the mutation. If the mutation was
// executed in a transaction (ent.Tx), a transactional client is returned.
func (m ContributorMutation) Client() *Client {
	client := &Client{config: m.config}
	client.init()
	return client
}

// Tx returns an `ent.Tx` for mutations that were executed in transactions;
// it returns an error otherwise.
func (m ContributorMutation) Tx() (*Tx, error) {
	if _, ok := m.driver.(*txDriver); !ok {
		return nil, errors.New("ent: mutation is not running in a transaction")
	}
	tx := &Tx{config: m.config}
	tx.init()
	return tx, nil
}

// ID returns the ID value in the mutation. Note that the ID is only available
// if it was provided to the builder or after it was returned from the database.
func (m *ContributorMutation) ID() (id int, exists bool) {
	if m.id == nil {
		return
	}
	return *m.id, true
}

// IDs queries the database and returns the entity ids that match the mutation's predicate.
// That means, if the mutation is applied within a transaction with an isolation level such
// as sql.LevelSerializable, the returned ids match the ids of the rows that will be updated
// or updated by the mutation.
func (m *ContributorMutation) IDs(ctx context.Context) ([]int, error) {
	switch {
	case m.op.Is(OpUpdateOne | OpDeleteOne):
		id, exists := m.ID()
		if exists {
			return []int{id}, nil
		}
		fallthrough
	case m.op.Is(OpUpdate | OpDelete):
		return m.Client().Contributor.Query().Where(m.predicates...).IDs(ctx)
	default:
		return nil, fmt.Errorf("IDs is not allowed on %s operations", m.op)
	}
}

// SetFirstName sets the "first_name" field.
func (m *ContributorMutation) SetFirstName(s string) {
	m.first_name = &s
}

// FirstName returns the value of the "first_name" field in the mutation.
func (m *ContributorMutation) FirstName() (r string, exists bool) {
	v := m.first_name
	if v == nil {
		return
	}
	return *v, true
}

// OldFirstName returns the old "first_name" field's value of the Contributor entity.
// If the Contributor object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *ContributorMutation) OldFirstName(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldFirstName is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldFirstName requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldFirstName: %w", err)
	}
	return oldValue.FirstName, nil
}

// ResetFirstName resets all changes to the "first_name" field.
func (m *ContributorMutation) ResetFirstName() {
	m.first_name = nil
}

// SetLastName sets the "last_name" field.
func (m *ContributorMutation) SetLastName(s string) {
	m.last_name = &s
}

// LastName returns the value of the "last_name" field in the mutation.
func (m *ContributorMutation) LastName() (r string, exists bool) {
	v := m.last_name
	if v == nil {
		return
	}
	return *v, true
}

// OldLastName returns the old "last_name" field's value of the Contributor entity.
// If the Contributor object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *ContributorMutation) OldLastName(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldLastName is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldLastName requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldLastName: %w", err)
	}
	return oldValue.LastName, nil
}

// ResetLastName resets all changes to the "last_name" field.
func (m *ContributorMutation) ResetLastName() {
	m.last_name = nil
}

// SetEmail sets the "email" field.
func (m *ContributorMutation) SetEmail(s string) {
	m.email = &s
}

// Email returns the value of the "email" field in the mutation.
func (m *ContributorMutation) Email() (r string, exists bool) {
	v := m.email
	if v == nil {
		return
	}
	return *v, true
}

// OldEmail returns the old "email" field's value of the Contributor entity.
// If the Contributor object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *ContributorMutation) OldEmail(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldEmail is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldEmail requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldEmail: %w", err)
	}
	return oldValue.Email, nil
}

// ResetEmail resets all changes to the "email" field.
func (m *ContributorMutation) ResetEmail() {
	m.email = nil
}

// Where appends a list predicates to the ContributorMutation builder.
func (m *ContributorMutation) Where(ps ...predicate.Contributor) {
	m.predicates = append(m.predicates, ps...)
}

// WhereP appends storage-level predicates to the ContributorMutation builder. Using this method,
// users can use type-assertion to append predicates that do not depend on any generated package.
func (m *ContributorMutation) WhereP(ps ...func(*sql.Selector)) {
	p := make([]predicate.Contributor, len(ps))
	for i := range ps {
		p[i] = ps[i]
	}
	m.Where(p...)
}

// Op returns the operation name.
func (m *ContributorMutation) Op() Op {
	return m.op
}

// SetOp allows setting the mutation operation.
func (m *ContributorMutation) SetOp(op Op) {
	m.op = op
}

// Type returns the node type of this mutation (Contributor).
func (m *ContributorMutation) Type() string {
	return m.typ
}

// Fields returns all fields that were changed during this mutation. Note that in
// order to get all numeric fields that were incremented/decremented, call
// AddedFields().
func (m *ContributorMutation) Fields() []string {
	fields := make([]string, 0, 3)
	if m.first_name != nil {
		fields = append(fields, contributor.FieldFirstName)
	}
	if m.last_name != nil {
		fields = append(fields, contributor.FieldLastName)
	}
	if m.email != nil {
		fields = append(fields, contributor.FieldEmail)
	}
	return fields
}

// Field returns the value of a field with the given name. The second boolean
// return value indicates that this field was not set, or was not defined in the
// schema.
func (m *ContributorMutation) Field(name string) (ent.Value, bool) {
	switch name {
	case contributor.FieldFirstName:
		return m.FirstName()
	case contributor.FieldLastName:
		return m.LastName()
	case contributor.FieldEmail:
		return m.Email()
	}
	return nil, false
}

// OldField returns the old value of the field from the database. An error is
// returned if the mutation operation is not UpdateOne, or the query to the
// database failed.
func (m *ContributorMutation) OldField(ctx context.Context, name string) (ent.Value, error) {
	switch name {
	case contributor.FieldFirstName:
		return m.OldFirstName(ctx)
	case contributor.FieldLastName:
		return m.OldLastName(ctx)
	case contributor.FieldEmail:
		return m.OldEmail(ctx)
	}
	return nil, fmt.Errorf("unknown Contributor field %s", name)
}

// SetField sets the value of a field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *ContributorMutation) SetField(name string, value ent.Value) error {
	switch name {
	case contributor.FieldFirstName:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetFirstName(v)
		return nil
	case contributor.FieldLastName:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetLastName(v)
		return nil
	case contributor.FieldEmail:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetEmail(v)
		return nil
	}
	return fmt.Errorf("unknown Contributor field %s", name)
}

// AddedFields returns all numeric fields that were incremented/decremented during
// this mutation.
func (m *ContributorMutation) AddedFields() []string {
	return nil
}

// AddedField returns the numeric value that was incremented/decremented on a field
// with the given name. The second boolean return value indicates that this field
// was not set, or was not defined in the schema.
func (m *ContributorMutation) AddedField(name string) (ent.Value, bool) {
	return nil, false
}

// AddField adds the value to the field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *ContributorMutation) AddField(name string, value ent.Value) error {
	switch name {
	}
	return fmt.Errorf("unknown Contributor numeric field %s", name)
}

// ClearedFields returns all nullable fields that were cleared during this
// mutation.
func (m *ContributorMutation) ClearedFields() []string {
	return nil
}

// FieldCleared returns a boolean indicating if a field with the given name was
// cleared in this mutation.
func (m *ContributorMutation) FieldCleared(name string) bool {
	_, ok := m.clearedFields[name]
	return ok
}

// ClearField clears the value of the field with the given name. It returns an
// error if the field is not defined in the schema.
func (m *ContributorMutation) ClearField(name string) error {
	return fmt.Errorf("unknown Contributor nullable field %s", name)
}

// ResetField resets all changes in the mutation for the field with the given name.
// It returns an error if the field is not defined in the schema.
func (m *ContributorMutation) ResetField(name string) error {
	switch name {
	case contributor.FieldFirstName:
		m.ResetFirstName()
		return nil
	case contributor.FieldLastName:
		m.ResetLastName()
		return nil
	case contributor.FieldEmail:
		m.ResetEmail()
		return nil
	}
	return fmt.Errorf("unknown Contributor field %s", name)
}

// AddedEdges returns all edge names that were set/added in this mutation.
func (m *ContributorMutation) AddedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// AddedIDs returns all IDs (to other nodes) that were added for the given edge
// name in this mutation.
func (m *ContributorMutation) AddedIDs(name string) []ent.Value {
	return nil
}

// RemovedEdges returns all edge names that were removed in this mutation.
func (m *ContributorMutation) RemovedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// RemovedIDs returns all IDs (to other nodes) that were removed for the edge with
// the given name in this mutation.
func (m *ContributorMutation) RemovedIDs(name string) []ent.Value {
	return nil
}

// ClearedEdges returns all edge names that were cleared in this mutation.
func (m *ContributorMutation) ClearedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// EdgeCleared returns a boolean which indicates if the edge with the given name
// was cleared in this mutation.
func (m *ContributorMutation) EdgeCleared(name string) bool {
	return false
}

// ClearEdge clears the value of the edge with the given name. It returns an error
// if that edge is not defined in the schema.
func (m *ContributorMutation) ClearEdge(name string) error {
	return fmt.Errorf("unknown Contributor unique edge %s", name)
}

// ResetEdge resets all changes to the edge with the given name in this mutation.
// It returns an error if the edge is not defined in the schema.
func (m *ContributorMutation) ResetEdge(name string) error {
	return fmt.Errorf("unknown Contributor edge %s", name)
}