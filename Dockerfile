# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build project
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled Angular files from Stage 1
# Note: Update 'your-app-name' to match your actual build output directory name inside dist/
COPY --from=build /app/dist/ecom/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]