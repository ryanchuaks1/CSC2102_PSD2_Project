FROM node:18 AS base

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

FROM base AS final

COPY . .

EXPOSE 3000