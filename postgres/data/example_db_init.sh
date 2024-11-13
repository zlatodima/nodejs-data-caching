psql -U "$POSTGRES_USER" -c "CREATE DATABASE dvdrental;"

export PGPASSWORD="$POSTGRES_PASSWORD"
pg_restore -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -d "$POSTGRES_DB_NAME" -p 5432 --clean /var/lib/postgresql/data/dvdrental.tar