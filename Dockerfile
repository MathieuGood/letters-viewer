FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 9005

CMD ["nginx", "-g", "daemon off;"]