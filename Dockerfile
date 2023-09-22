FROM node:18 AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn install --production
RUN yarn build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]