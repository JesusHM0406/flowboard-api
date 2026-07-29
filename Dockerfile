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
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --chown=node --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]