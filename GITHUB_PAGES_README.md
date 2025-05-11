# Deploying to GitHub Pages

This document provides instructions on how to deploy the portfolio application to GitHub Pages.

## Automatic Deployment

This project is set up with GitHub Actions for automatic deployment to GitHub Pages. When you push to the `main` branch, the following happens:

1. The GitHub Actions workflow (`.github/workflows/deploy.yml`) is triggered
2. It builds the React application with the correct base path for GitHub Pages
3. The built files are deployed to the `gh-pages` branch
4. GitHub Pages serves the content from this branch

The deployed site will be available at: https://dilzhaan.github.io/DilZhan-s-Portfolio/

## Manual Deployment

If you need to deploy manually, you can follow these steps:

```bash
# Set the correct base path for GitHub Pages
export BASE_URL=/DilZhan-s-Portfolio/

# Build the project
npm run build

# Install gh-pages if not already installed
npm install -g gh-pages

# Deploy to GitHub Pages
gh-pages -d dist
```

## Repository Setup

To ensure GitHub Pages works correctly:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "Deploy from a branch"
4. Select the `gh-pages` branch and the `/ (root)` folder
5. Click "Save"

## Troubleshooting

If you encounter issues with client-side routing (404 errors when refreshing or directly accessing a route):

1. Verify that the 404.html file exists in the public directory
2. Check that the script in index.html is working properly
3. Make sure the `base` property in vite.config.js is set correctly

## Docker Deployment

This project also includes a Docker workflow (`.github/workflows/docker.yml`) that builds and pushes a Docker image to GitHub Container Registry when changes are pushed to the main branch.

To run the Docker image:

```bash
docker pull ghcr.io/dilzhaan/dilzhan-s-portfolio:latest
docker run -d -p 80:80 ghcr.io/dilzhaan/dilzhan-s-portfolio:latest
``` 