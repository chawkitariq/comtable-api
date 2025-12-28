#! /bin/sh

if [ "$NODE_ENV" != "production" ]; then
  npm i
fi

npm run migration:run

exec "$@"