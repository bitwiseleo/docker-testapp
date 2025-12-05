FROM node:20-alpine

WORKDIR /testapp

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]