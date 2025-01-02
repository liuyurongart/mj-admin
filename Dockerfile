FROM harbor.tanzhishuju.com/library/node:18-alpine  as build
WORKDIR /app
ARG APP_ENV

COPY package.json package-lock.json .npmrc  ./
RUN npm install

COPY . .
RUN npm run build

FROM harbor.tanzhishuju.com/library/nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
