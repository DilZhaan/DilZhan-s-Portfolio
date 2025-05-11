# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Fix case sensitivity in import paths
RUN find src -type f -name "*.jsx" -o -name "*.js" | xargs grep -l "typingAnimation" | xargs sed -i 's/typingAnimation/TypingAnimation/g' || true

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 