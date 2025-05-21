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

FROM node:18

# Install dependencies
RUN apt-get update && apt-get install -y ffmpeg wget unzip

# Create bin directory for Rhubarb
RUN mkdir -p /usr/local/bin/rhubarb && \
    wget -O /tmp/rhubarb.zip https://github.com/DanielSWolf/rhubarb-lip-sync/releases/download/v1.11.0/Rhubarb-Lip-Sync-Linux.zip && \
    unzip /tmp/rhubarb.zip -d /usr/local/bin/rhubarb && \
    chmod +x /usr/local/bin/rhubarb/rhubarb && \
    rm /tmp/rhubarb.zip

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install Node deps
RUN npm install

# Expose your port
EXPOSE 5555

# Start the app
CMD ["npm", "start"]
