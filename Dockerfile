FROM node:20-alpine

RUN npm install -g pnpm pm2 bun

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY dist ./dist

ENV NODE_ENV=production

CMD ["pm2-runtime", "dist/server.js"]
