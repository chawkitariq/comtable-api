FROM node:22.21-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.21-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22.21-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV APP_ENV=production
ENV DB_SYNCHRONIZE=false
ENV DB_SSL=true

COPY --from=build /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json

COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT [ "docker-entrypoint.sh" ]

EXPOSE 3000
CMD ["node", "dist/main"]
