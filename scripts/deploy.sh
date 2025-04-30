#!/bin/bash
set -e

# Login to GitHub Container Registry on EC2
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin

# Pull the latest image
docker pull $IMAGE_NAME

# Stop and remove the old container if it exists
docker stop comtable-api-container || true
docker rm comtable-api-container || true

# Run the new container
docker run -d --name comtable-api-container \
-p 80:80 \
--restart unless-stopped \
$IMAGE_NAME

# Clean up old images
docker system prune -f