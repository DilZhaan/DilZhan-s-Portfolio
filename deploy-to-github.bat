@echo off
echo Building Docker image...
docker-compose build

echo Creating temporary container...
docker create --name temp-portfolio-container portfolio

echo Creating dist directory...
if not exist dist mkdir dist

echo Copying files from container...
docker cp temp-portfolio-container:/usr/share/nginx/html/. ./dist/

echo Removing temporary container...
docker rm temp-portfolio-container

echo Creating 404.html page for SPA routing...
copy dist\index.html dist\404.html

echo.
echo Build completed successfully!
echo Files are extracted to the ./dist directory
echo.
echo To deploy to GitHub Pages:
echo 1. Commit and push the dist directory to your repository
echo 2. Enable GitHub Pages in your repository settings and set the source to GitHub Actions
echo.
echo Or, if using GitHub Actions automation:
echo Just push your changes to the main branch, and the GitHub Actions workflow will handle the deployment 