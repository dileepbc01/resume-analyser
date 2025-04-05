# Base image
FROM node:lts-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat && apk update

# Builder stage
FROM base AS builder
WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo

# Copy everything and prune for server
COPY . .
RUN turbo prune --scope=server --docker || (echo "Turbo prune failed" && exit 1)

# Installer stage
FROM base AS installer
WORKDIR /app

# Copy pruned package.json and lockfile from builder
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install pnpm and install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy full source files needed for build
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json

# Build the server
RUN pnpm run build

# Runner stage
FROM base AS runner
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Create non-root user
RUN addgroup --system --gid 1001 expressjs \
 && adduser --system --uid 1001 expressjs

# Copy build artifacts with ownership set during copy
COPY --chown=expressjs:expressjs --from=installer /app ./

# Switch to non-root user
USER expressjs

WORKDIR /app/apps/server
EXPOSE 3000
CMD ["pnpm", "run", "start"]
