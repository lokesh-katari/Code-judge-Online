# Set the base image to Node.js
FROM node:latest

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend files to the container
COPY . .

# Build the React app (assuming you have a build script in your package.json)
RUN npm run build

# Expose the frontend server port (change this to your frontend's actual port)
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
