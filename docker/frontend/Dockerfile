FROM node:13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./src/frontend/package.json /app/package.json

RUN npm install

CMD ["npm", "start"]