#!/bin/bash
set -e

cd

echo "Login to GitHub Container Registry on EC2"
echo "$GITHUB_TOKEN" | docker login $REGISTRY -u "$GITHUB_ACTOR" --password-stdin

echo "Pull the latest image"
docker pull $FULL_IMAGE_NAME

echo "Stop and remove the old container if it exists"
docker stop comtable-api-container || true
docker rm comtable-api-container || true

echo "Run the new container"
docker run -d --env-file ./.env --name comtable-api-container \
  -p 80:3000 \
  --restart unless-stopped \
  $FULL_IMAGE_NAME
  
echo "Clean up old images"
docker system prune -f

echo "Deployment completed successfully!"