# # Use official Node.js 18 base image
# FROM node:18

# # Install FFmpeg
# RUN apt-get update && \
#     apt-get install -y ffmpeg && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# # Set working directory
# WORKDIR /app

# # Copy backend code
# COPY . .

# # Install dependencies
# RUN npm install --production

# # Expose port
# EXPOSE 5555

# # Start the app
# CMD ["npm", "start"]

# Use official Node.js base image
FROM node:18

# Install FFmpeg and dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg wget unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Download Rhubarb Lip Sync (Linux binary)
RUN mkdir -p /app/bin/rhubarb && \
    wget -O /app/bin/rhubarb/rhubarb.zip https://github.com/DanielSWolf/rhubarb-lip-sync/releases/download/v1.11.0/Rhubarb-Lip-Sync-Linux.zip && \
    unzip /app/bin/rhubarb/rhubarb.zip -d /app/bin/rhubarb && \
    chmod +x /app/bin/rhubarb/rhubarb && \
    rm /app/bin/rhubarb/rhubarb.zip

# Copy backend code
COPY . .

# Install dependencies
RUN npm install --production

# Expose your API port
EXPOSE 5555

# Start the server
CMD ["npm", "start"]



