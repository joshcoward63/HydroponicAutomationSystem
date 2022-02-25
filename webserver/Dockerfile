# pull official base image
FROM node:16.14

# set working directory
WORKDIR /web-server

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . .

EXPOSE 8080

# start app
CMD [ "node", "index.js" ]