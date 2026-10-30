# ==========================================
# 1. Build Stage
# ==========================================
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================
# 2. Production Runner Stage (SSR Node Express)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Copy build artifacts and dependencies
COPY --from=build /app/dist/tela-inicial ./dist/tela-inicial
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4000

CMD ["node", "dist/tela-inicial/server/server.mjs"]
