FROM node:22-alpine as builder

WORKDIR /app

COPY package.json .

ARG BACKEND

ENV VITE_API_BASE_URL=$BACKEND

RUN npm i

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /app/dist/ /var/www/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]