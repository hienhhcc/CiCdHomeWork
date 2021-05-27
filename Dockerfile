FROM node:12-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package.json .
RUN npm install --production
COPY . . 
CMD ['npm','run','start']
