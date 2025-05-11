# Dockerized Portfolio Application

This document provides instructions on how to build, run, and deploy the portfolio application using Docker.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine (optional but recommended)

## Building and Running with Docker Compose (Recommended)

The easiest way to get started is by using Docker Compose:

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at http://localhost:80

## Building and Running with Docker CLI

If you prefer using Docker directly:

```bash
# Build the Docker image
docker build -t portfolio .

# Run the container
docker run -d -p 80:80 --name portfolio-app portfolio

# Stop the container
docker stop portfolio-app

# Remove the container
docker rm portfolio-app
```

## Production Deployment

For production deployment, you may want to consider:

1. Using a reverse proxy like Nginx or Traefik if hosting multiple services
2. Setting up SSL certificates for HTTPS
3. Using Docker Swarm or Kubernetes for orchestration

### Example with Docker Hub

```bash
# Build and tag with your Docker Hub username
docker build -t yourusername/portfolio:latest .

# Push to Docker Hub
docker push yourusername/portfolio:latest

# On your server, pull and run
docker pull yourusername/portfolio:latest
docker run -d -p 80:80 yourusername/portfolio:latest
```

## Configuration

The Nginx configuration file (`nginx.conf`) is set up to handle client-side routing for the React application. If you need to modify the Nginx configuration, edit the `nginx.conf` file and rebuild the container.

## Common Issues and Solutions

### Case Sensitivity in Import Paths

The Dockerfile includes a step to fix case sensitivity issues with import paths. This is particularly important when deploying to Linux-based containers, which use a case-sensitive file system, whereas Windows is case-insensitive.

If you encounter errors like:
```
Could not resolve "./Typing_Automation/typingAnimation" from "[file path]"
```

Check that your import statements match the actual case of your file names. The Docker build process includes a step to automatically fix common case mismatches.

## Troubleshooting

- If the site doesn't load, check if the container is running: `docker ps`
- View logs: `docker logs portfolio-app`
- If you make changes to the code, rebuild the Docker image to apply them 