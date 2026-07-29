# Common base
FROM node:24.18.0-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Development
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

# Build
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM node:24.18.0-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
USER node
COPY --chown=node --from=build /app/node_modules ./node_modules
COPY --chown=node --from=build /app/dist ./dist
COPY --chown=node --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/main.js"]