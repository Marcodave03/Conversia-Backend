# Use official Node.js 18 base image
FROM node:18

# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend code
COPY . .

# Install dependencies
RUN npm install --production

# Expose port
EXPOSE 5555

# Start the app
CMD ["npm", "start"]
