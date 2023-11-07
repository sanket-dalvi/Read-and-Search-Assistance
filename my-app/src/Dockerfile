# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container for React
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory for React
COPY package*.json ./

# Install app dependencies for React
RUN npm install

# Build the React front-end
RUN npm run build

# Expose the port your React app is running on
EXPOSE 80

# Define the command to run your React app
CMD ["serve", "-s", "build", "-l", "80"]
