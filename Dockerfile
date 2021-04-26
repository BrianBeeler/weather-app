FROM node:14

#Create directory

RUN mkdir -p /usr/src/app/react-app/src
RUN mkdir -p /usr/src/app/react-app/public
RUN mkdir -p /usr/src/app/react-app/build

WORKDIR /usr/src/app

COPY package*.json ./
COPY react-app/package*.json ./react-app
COPY react-app/src /usr/src/app/react-app/src
COPY react-app/public react-app/public

RUN cd react-app
RUN npm install
RUN npm build

RUN cd ..
RUN npm install
COPY config config
COPY server.js server.js
COPY controllers controllers
COPY models models
COPY routes routes

EXPOSE  8080
CMD [ "node", "server.js" ]