FROM ghcr.io/pnpm/pnpm:12 AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY . .
RUN pnpm install --frozen-lockfile

FROM node:26-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "server.js"]