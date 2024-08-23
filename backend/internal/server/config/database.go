package config

import "fmt"

type DatabaseConfig struct {
	Host     string `env:"HOST"`
	Port     uint16 `env:"PORT"`
	User     string `env:"USER"`
	DBName   string `env:"DBNAME"`
	Password string `env:"PASSWORD"`
}

// For use in ent.Open
func (d *DatabaseConfig) ConnString() string {
	return fmt.Sprintf(
		"host=%s port=%d user=%s dbname=%s password=%s",
		d.Host,
		d.Port,
		d.User,
		d.DBName,
		d.Password)
}
