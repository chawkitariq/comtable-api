FROM node:22.21

ENV NODE_ENV="development"

WORKDIR /app

COPY --chmod=755 ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT [ "docker-entrypoint.sh" ]
