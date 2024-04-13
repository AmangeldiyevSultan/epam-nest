# Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json  ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production
