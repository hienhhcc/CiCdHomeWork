FROM node:12-alpine

COPY package.json .

RUN npm install

COPY . . 

ENV NODE_ENV=production

EXPOSE 3001

CMD ['npm','run','start']
