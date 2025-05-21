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

# Install ffmpeg and unzip
RUN apt-get update && \
    apt-get install -y ffmpeg unzip wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory to project root
WORKDIR /app

# Copy your project into the container
COPY . .

# Download and install Rhubarb
RUN mkdir -p ./bin/rhubarb && \
    apt-get update && apt-get install -y wget unzip && \
    wget -O /tmp/rhubarb.zip https://github.com/DanielSWolf/rhubarb-lip-sync/releases/download/v1.11.0/Rhubarb-Lip-Sync-Linux.zip && \
    unzip /tmp/rhubarb.zip -d ./bin/rhubarb && \
    chmod +x ./bin/rhubarb/rhubarb && \
    rm /tmp/rhubarb.zip


# Install Node.js dependencies
RUN npm install --production

# Expose your backend port
EXPOSE 5555

# Start your server
CMD ["npm", "start"]



