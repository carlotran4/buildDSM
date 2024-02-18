# Use the official Python 3.10 image.
# https://hub.docker.com/_/python
FROM python:3.10

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
COPY requirements.txt ./

# Copy the client directory to the Docker image
COPY client ./client

# Install production dependencies.
RUN npm install
RUN npm run build

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "start" ]