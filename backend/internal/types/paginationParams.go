package types

type PaginationParams struct {
	Limit  int `query:"limit"`
	Offset int `query:"offset"`
}
