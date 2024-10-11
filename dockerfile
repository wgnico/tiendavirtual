# Usa una imagen de Node como base
FROM node:alpine AS builder

WORKDIR /ang

COPY . .

RUN npm i && npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /ang/dist/store/browser .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]