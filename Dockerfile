# FROM node:12-alpine as node
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ARG env
# RUN ng build
# FROM nginx:stable
# EXPOSE 80
# COPY --from=node /app/dist/ /var/www
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]
###################################3
#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
ARG env
RUN npm install
RUN npm run build ${env} 
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
