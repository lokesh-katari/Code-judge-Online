# Set the base image to Node.js
FROM node:latest

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all backend files to the container
COPY . .

# Expose the backend server port (change this to your backend's actual port)
EXPOSE 5000

# Start the backend server
CMD ["npm", "run","dev"]
