# Stage 1: Build the Angular app
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build -- --configuration=production

# Stage 2: Serve the app using NGINX
FROM nginx:alpine

# Set the working directory in the NGINX container
WORKDIR /usr/share/nginx/html

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/eingress-device-ui .

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
