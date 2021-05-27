FROM node:12-alpine
COPY package.json .
RUN npm install --development
COPY . . 
RUN npm run test
CMD ['npm','run','start']
