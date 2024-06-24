FROM node:14-bullseye as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run ng build

#Segunda etapa

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/gym-billing /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]