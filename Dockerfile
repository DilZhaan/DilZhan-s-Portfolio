# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Set the base URL for GitHub Pages
ENV BASE_URL=/DilZhan-s-Portfolio/

# Copy package files and install dependencies
COPY package.json package-lock.json ./
# Try npm ci first, but fall back to npm install if it fails
RUN npm ci || npm install

# Copy project files
COPY . .

# Build the project with proper base path
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a 404.html for GitHub Pages SPA routing
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

# Create a .nojekyll file to prevent GitHub Pages from using Jekyll
RUN touch /usr/share/nginx/html/.nojekyll

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]