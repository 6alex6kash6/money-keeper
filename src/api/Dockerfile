# syntax=docker/dockerfile:1

FROM node:17

ENV NODE_ENV=production

WORKDIR /api

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD npm run prod