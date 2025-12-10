FROM node:18-alpine

WORKDIR /app

# Install dependencies for building
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --omit=dev

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]