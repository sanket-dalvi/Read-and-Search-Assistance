# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory for Express.js
COPY package*.json ./

# Install app dependencies for Express.js
RUN npm install

# Expose the port your Express app is running on
EXPOSE 3000

# Define the command to run your Express app
CMD ["node", "server.js"]
