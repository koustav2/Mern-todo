FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .

EXPOSE $PORT

CMD ["npm", "run", "dev"]