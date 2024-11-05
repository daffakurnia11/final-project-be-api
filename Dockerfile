# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript files
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine

WORKDIR /app

# Copy the built files and necessary dependencies from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# Install only production dependencies
RUN npm install --only=production

# Generate Prisma Client in the production stage
RUN npx prisma generate

# Expose the port for the application
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
