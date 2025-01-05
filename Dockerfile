FROM node:20.18.1-alpine3.21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY .env.docker .env

COPY . .

RUN npm run build

EXPOSE 33013

CMD ["node", "dist/main"]