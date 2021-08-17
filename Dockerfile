FROM node:8-alpine

RUN apk add git python2 curl build-base

WORKDIR /editor

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build-prod

ENTRYPOINT ["npm", "run", "start"]
