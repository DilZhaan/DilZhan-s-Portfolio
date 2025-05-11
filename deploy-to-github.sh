#!/bin/bash

# Build the Docker image
docker-compose build

# Create a temporary container from the image
docker create --name temp-portfolio-container portfolio

# Create a dist directory if it doesn't exist
mkdir -p ./dist

# Copy the built files from the container to the local dist directory
docker cp temp-portfolio-container:/usr/share/nginx/html/. ./dist/

# Remove the temporary container
docker rm temp-portfolio-container

# Create 404.html for SPA routing on GitHub Pages
cp ./dist/index.html ./dist/404.html

echo "Build completed successfully!"
echo "Files are extracted to the ./dist directory"
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Commit and push the dist directory to your repository"
echo "2. Enable GitHub Pages in your repository settings and set the source to GitHub Actions"
echo ""
echo "Or, if using GitHub Actions automation:"
echo "Just push your changes to the main branch, and the GitHub Actions workflow will handle the deployment" 