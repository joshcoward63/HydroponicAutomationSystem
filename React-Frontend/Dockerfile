# pull official base image
FROM node:16.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i socket.io@2.3.0
RUN npm install react-scripts
RUN npm i react-router-dom
RUN npm i react-d3-speedometer

# add app
COPY . ./

EXPOSE 5500

# start app
CMD ["npm", "start"]