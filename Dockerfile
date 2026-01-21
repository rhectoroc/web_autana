# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
# Copying package files first to leverage Docker cache
COPY package*.json ./
# Use npm ci for clean, deterministic, and often faster installs
RUN npm ci

# Copy source code
COPY . .

# Build the application
# Increase memory limit for the build process to avoid OOMKilled (Exit Code 137)
# Adjust 4096 to be slightly less than your container's total memory limit
ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=$NODE_OPTIONS

RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server

# Copy essential static assets/config
COPY --from=builder /app/server/schema.sql ./server/schema.sql
COPY --from=builder /app/public ./public

# Create uploads directory with correct permissions
RUN mkdir -p uploads && chown -R node:node uploads

# Switch to non-root user for security
USER node

# Expose the API port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
