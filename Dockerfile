# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built files and necessary dependencies from the build stage
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port for the application
EXPOSE 8000

# Use the PORT environment variable if available, or default to 8000
CMD ["node", "dist/server.js"]
