# Use the official Node.js 18 image as the base image
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=test
ENV DEPL_TYPE=prod
ENV PORT=3000
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV REDIS_URL=redis://redis:6379

# Command to run the application
CMD ["npm", "start"]
