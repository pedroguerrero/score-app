FROM node:16.13.1-alpine as base
WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM httpd:2.4.51-alpine
COPY --chown=www-data:www-data --from=base /app/build /usr/local/apache2/htdocs
EXPOSE 80
