# Stage 1: Build the React app
FROM node:14 AS build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
