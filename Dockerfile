FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 4000 4000