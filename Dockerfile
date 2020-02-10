# Base image
FROM node:12-alpine

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
COPY .env .
COPY ormconfig.js .

# Install and cache app dependencies
RUN yarn

# Copy dist files to the working directory
COPY dist .

# Expose ports
EXPOSE 4000

# Set Environment
ENV NODE_ENV='production'

# Start app
CMD ["node", "index.js"]
