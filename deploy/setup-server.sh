#!/bin/bash

# Exit on any error
set -e

echo "Starting server setup..."

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
if ! command -v docker &> /dev/null
then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker is already installed."
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null
then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose is already installed."
fi

echo "Server setup complete! Please log out and log back in for Docker group changes to take effect."
