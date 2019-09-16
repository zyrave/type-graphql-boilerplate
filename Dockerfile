# Base image
FROM node:10-alpine

# Install tools required for project
RUN apk update
RUN apk add --no-cache bash

# Create app directory and use it as the working directory
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

# Copy all necessary files to the working directory
COPY package*.json .
COPY yarn.lock .
COPY wait-for-it.sh .

# Install and cache app dependencies
RUN yarn

# Copy dist files to the working directory
COPY dist .

# Expose ports
EXPOSE 4000

# Start app
CMD ["yarn", "start"]
