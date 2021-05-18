
FROM node:12-alpine AS react-build
WORKDIR /usr/src/app
COPY react-app/ ./react-app/
RUN cd react-app && npm install && npm run build

FROM node:12-alpine AS server-build
WORKDIR /root/
COPY --from=react-build /usr/src/app/react-app/build ./react-app/build
COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["node", "./server.js"]