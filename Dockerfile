FROM node:latest

# Create app directory
WORKDIR /src/app

COPY package*.json ./

RUN yarn install

COPY . . 

RUN yarn run build

EXPOSE 4000

CMD ["node", "bin/index.js"]