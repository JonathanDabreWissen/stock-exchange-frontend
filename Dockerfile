# Use official Node.js image as the base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project into the container
COPY . .

# Expose the port Vite is running on
EXPOSE 5173

# Run the build and start the app
CMD ["npm", "run", "dev"]
