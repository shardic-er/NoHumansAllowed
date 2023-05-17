# Start with the official Node.js image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 8081

# Start your app
CMD [ "npm", "start" ]
