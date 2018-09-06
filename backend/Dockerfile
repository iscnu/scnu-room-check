FROM node:8
WORKDIR /app
COPY . /app
RUN npm install
VOLUME /app/api/
ENTRYPOINT npm run api
