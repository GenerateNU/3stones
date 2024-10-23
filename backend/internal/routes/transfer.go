package routes

import (
	"backend/internal/controllers"
	"backend/internal/types"
)

func TransferRoutes(params types.RouterParams) {
	transferController := controllers.NewTransferController(params.ServiceParams)

	// Group transfer routes under "/transfers"
	transfers := params.Router.Group("/transfers")

	// Set up transfer routes with the relevant authorization middleware
	transfers.Post("/authorize", params.Auth.Middleware(), transferController.CreateTransferAuthorization)
	transfers.Post("/create", params.Auth.Middleware(), transferController.CreateTransfer)
}
