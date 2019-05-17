FROM node:10.15.3-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN apk update
RUN apk add yarn

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
