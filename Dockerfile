# Gunakan image node.js sebagai base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code ke dalam container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build aplikasi TypeScript
RUN npm run build

# Expose port
EXPOSE 8000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]
