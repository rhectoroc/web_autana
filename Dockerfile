# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
# Copying package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
# This runs tsc, vite build, and the server build script
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server

# Copy essential static assets/config not caught by build
# The database initialization script expects schema.sql in /app/server/
COPY --from=builder /app/server/schema.sql ./server/schema.sql
# If you have an uploads folder that needs to persist, you should mount a volume at runtime.
# Creating the directory here locally so permissions are set correctly if needed
RUN mkdir -p uploads

# Expose the API port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
