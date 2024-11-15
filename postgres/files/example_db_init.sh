psql -U postgres -c "CREATE DATABASE dvdrental;"

#pg_dump --clean
export PGPASSWORD="$POSTGRES_PASSWORD"
pg_restore -c -d "$POSTGRES_DB_NAME" -U "$POSTGRES_USER" --clean --if-exists /docker-entrypoint-initdb.d/dvdrental.tar