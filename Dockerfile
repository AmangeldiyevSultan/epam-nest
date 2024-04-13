# Build
FROM node:20-alpine AS build
WORKDIR /
COPY package*.json  ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# Production
FROM node:20-alpine AS production
WORKDIR /usr/src/app

COPY  --from=build /dist ./dist
COPY  --from=build /node_modules ./node_modules

EXPOSE 3000/tcp
CMD [ "node", "dist/main.js" ]