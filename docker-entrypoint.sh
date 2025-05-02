#! /bin/sh

npm i

npm run migration:run

exec "$@"