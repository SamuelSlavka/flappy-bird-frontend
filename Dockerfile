# #  Stage 1 - build
# base image
FROM node:latest as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app/
RUN yarn install --prefer-offline --frozen-lockfile --network-timeout=400000 --cache-folder .yarn-cache
RUN yarn run build

# # stage 2 - deploy
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]