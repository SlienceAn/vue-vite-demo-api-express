# FROM node:20-alpine

# WORKDIR /usr/src/app

# RUN npm install -g pnpm pm2 ts-node typescript

# COPY package.json pnpm-lock.yaml ./

# RUN pnpm install

# COPY dist/ ./

# EXPOSE 3000

# CMD [ "pm2-runtime","src/app.js" ]



FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm pm2 bun

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . ./

RUN which bun

CMD [ "pm2-runtime","src/app.ts" ]
