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

func RecordInvestment(db *pgxpool.Pool, investorID uuid.UUID, propertyID, amount string) (uuid.UUID, error) {
	query := `
        INSERT INTO investor_investments (investor_id, project_id, funded_cents)
        VALUES ($1, $2, $3)
        RETURNING id
    `
	amountCents, err := strconv.Atoi(amount)
	if err != nil {
		return uuid.Nil, err
	}

	var id uuid.UUID
	err = db.QueryRow(context.Background(), query, investorID, propertyID, amountCents).Scan(&id)
	if err != nil {
		return uuid.Nil, err
	}

	return id, nil
}

func UpdateCashBalance(db *pgxpool.Pool, investorID uuid.UUID, amount string, operation string) error {
	amountCents, err := strconv.Atoi(amount)
	if err != nil {
		return err
	}
	query := ""
	if operation == "deposit" {
		query = `
            UPDATE investors
            SET cash_balance_cents = cash_balance_cents + $1
            WHERE supabase_id = $2
        `
	} else if operation == "withdraw" {
		query = `
            UPDATE investors
            SET cash_balance_cents = cash_balance_cents - $1
            WHERE supabase_id = $2 AND cash_balance_cents >= $1
        `
	} else {
		return fmt.Errorf("invalid operation")
	}

	result, err := db.Exec(context.Background(), query, amountCents, investorID)
	if err != nil {
		return err
	}
	if result.RowsAffected() == 0 {
		return fmt.Errorf("insufficient funds")
	}

	return nil
}

func HasSufficientBalance(db *pgxpool.Pool, investorID uuid.UUID, amount string) (bool, error) {
	amountCents, err := strconv.Atoi(amount)
	if err != nil {
		return false, err
	}

	var cashBalanceCents int
	query := `
        SELECT cash_balance_cents FROM investors WHERE supabase_id = $1
    `
	err = db.QueryRow(context.Background(), query, investorID).Scan(&cashBalanceCents)
	if err != nil {
		return false, err
	}

	if cashBalanceCents >= amountCents {
		return true, nil
	} else {
		return false, nil
	}
}
