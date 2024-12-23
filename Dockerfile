FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY dist ./dist

COPY public ./dist/public

EXPOSE 3000

CMD [ "pnpm","run","prod" ]


