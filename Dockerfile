


# Use an official Node.js runtime as a parent image
FROM node:current

# Set the working directory to /app
RUN mkdir /app && cd /app

WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    ALLOWED_URL=http://localhost:3000 \
    MONGO_URL="mongodb+srv://lilsoftx:dannybossx@cluster0.ojug9j4.mongodb.net/ccsocialbot?retryWrites=true&w=majority" \
    AT_SECRET=v86MpRQS+FUMEOogX7AG581oyAeij4x6ID6NKqg5Hg0= \
    RT_SECRET=5KR2CWu4m1RZTvqZIrbKNitmxBxqBatep3H9CMaVg0o=

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


# Copy package.json and package-lock.json to the container
COPY . ./


# Install any needed packages specified in package.json
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run build

# Expose port 3002 for the server
EXPOSE 3000


# Start the server using the production build
CMD [ "node", "dist/main.js" ]

# Build docker image with command: >> docker build -t nestjs-pup-backend-v1 .
# RUn docker container with >> docker run --rm -p 3000:3000 nestjs-pup-backend-v1
