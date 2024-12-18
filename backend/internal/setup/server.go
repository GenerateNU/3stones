package setup

import (
	"context"
	"errors"
	"fmt"

	"backend/internal/api_errors"
	"backend/internal/auth"
	"backend/internal/config"
	"backend/internal/routes"
	"backend/internal/types"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/plaid/plaid-go/v29/plaid"
)

func SetupServer(config *config.Config) (*fiber.App, error) {
	// Setup app
	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			var e *api_errors.ApiError
			if errors.As(err, &e) {
				return ctx.Status(e.Code).JSON(fiber.Map{"message": e.Message})
			}

			fmt.Println("unhandled error - ", err)
			// Its probably best to hide implementation details from api users, hence the unknown.
			// printing is chill though
			return ctx.Status(500).JSON(fiber.Map{"message": "unknown"})
		},
	})

	app.Use(logger.New())

	// Setup db
	db, err := pgxpool.New(context.Background(), config.Database.Url)
	if err != nil {
		return nil, err
	}

	// Setup plaid
	plaidConfig := plaid.NewConfiguration()
	plaidConfig.AddDefaultHeader("PLAID-CLIENT-ID", config.Plaid.ClientId)
	plaidConfig.AddDefaultHeader("PLAID-SECRET", config.Plaid.Secret)
	plaidConfig.UseEnvironment(plaid.Sandbox)
	plaidClient := plaid.NewAPIClient(plaidConfig)

	// Setup routes
	router := app.Group("/api/v1")

	routerParams := types.RouterParams{
		Auth: &auth.AuthFactory{
			Config: &config.Supabase,
			DB:     db,
		},
		Router: router,
		Config: config,
		ServiceParams: &types.ServiceParams{
			DB:    db,
			Plaid: plaidClient,
		},
	}

	// Initialize routes here! VVVV
	routes.Contributors(routerParams)
	routes.Developers(routerParams)
	routes.Projects(routerParams)
	routes.Investors(routerParams)
	routes.PlaidRoutes(routerParams)

	router.Get("/health", func(ctx *fiber.Ctx) error {
		return ctx.SendStatus(200)
	})

	return app, nil
}
