#!/bin/bash
set -e

echo "Granting database privileges..."
until mysqladmin ping -h "$DB_HOST" -u root -p"$DB_ROOT_PASSWORD" --silent --skip-ssl; do
    sleep 2
done

mysql -h"$DB_HOST" -P"$DB_PORT" -uroot -p"$DB_ROOT_PASSWORD" --skip-ssl \
  -e "GRANT ALL PRIVILEGES ON *.* TO '${DB_USER}'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"

echo "Checking if database is already initialized..."
TABLE_COUNT=$(mysql -h"$DB_HOST" -uroot -p"$DB_ROOT_PASSWORD" --skip-ssl -N -B \
  -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME';")

if [ "$TABLE_COUNT" -eq "0" ]; then
  echo "Database is empty. Running migrations and seeds..."
  bun prisma migrate deploy
  bun prisma db seed
else
  echo "Database is already initialized. Skipping migrations."
fi

exec "$@"
