FROM node:23-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN apk update

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
