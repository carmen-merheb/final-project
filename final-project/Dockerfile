# Use Node.js for building the Angular app
FROM node:20 AS build

# Set working directory inside the container
WORKDIR /final-project

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Nginx to serve the built Angular app
FROM nginx:1.25-alpine

# Copy the correct Angular build output to Nginx's HTML directory
COPY --from=build /final-project/dist/final-project/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
