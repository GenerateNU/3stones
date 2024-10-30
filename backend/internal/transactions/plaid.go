package transactions

import (
	"context"
	"fmt"
	"strconv"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/plaid/plaid-go/v29/plaid"
)

func StoreAccessToken(db *pgxpool.Pool, userID uuid.UUID, accessToken, itemID string) error {
	query := `
			UPDATE investors
			SET access_token = '$1', item_id = '$2'
			WHERE supabase_id = '$3';
			`

	_, err := db.Exec(context.Background(), query, accessToken, itemID, userID)
	return err
}

func GetAccessToken(db *pgxpool.Pool, userID uuid.UUID) (string, error) {
	query := `
			SELECT access_token FROM investors where supabase_id = $1;
			`

	var accessToken string
	err := db.QueryRow(context.Background(), query, userID).Scan(&accessToken)
	if err != nil {
		return "", err
	}

	return accessToken, nil
}

func GetFirstAccountID(plaidClient *plaid.APIClient, accessToken string) (string, error) {
	accountsGetRequest := plaid.NewAccountsGetRequest(accessToken)
	response, _, err := plaidClient.PlaidApi.AccountsGet(context.Background()).AccountsGetRequest(*accountsGetRequest).Execute()
	if err != nil {
		return "", err
	}

	accounts := response.GetAccounts()
	if len(accounts) == 0 {
		return "", fmt.Errorf("no accounts found")
	}

	return accounts[0].GetAccountId(), nil
}

func RecordInvestment(db *pgxpool.Pool, investorID uuid.UUID, propertyID, amount, transferID string) error {
	query := `
        INSERT INTO investor_investments (investor_id, project_id, funded_cents, transfer_id)
        VALUES ($1, $2, $3, $4)
    `
	amountCents, err := strconv.Atoi(amount)
	if err != nil {
		return err
	}
	_, err = db.Exec(context.Background(), query, investorID, propertyID, amountCents, transferID)
	return err
}
