FROM node:22.12.0

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm i -g @nestjs/cli

WORKDIR /home/node/api

COPY --chmod=777 ./docker-entrypoint.sh /usr/local/bin

ENTRYPOINT [ "docker-entrypoint.sh" ]
