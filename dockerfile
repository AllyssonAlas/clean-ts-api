FROM node:16
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN yarn install --prod --ignore-scripts && yarn add bcrypt