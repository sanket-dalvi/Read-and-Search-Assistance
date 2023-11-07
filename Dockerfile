# Use the official Node.js runtime as the base image

FROM mcr.microsoft.com/windows/nanoserver:ltsc2019

#FROM node:14

# Set the working directory inside the container
WORKDIR /my-app

# Copy package.json and package-lock.json to the container
COPY my-app/htmls/server/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express.js server is listening on
EXPOSE 3001

# Start your Express.js server
CMD ["node", "my-app/htmls/server/index.js"]


