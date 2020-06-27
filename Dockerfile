FROM node:12.13.1-alpine AS build_base

# update indices
RUN apk update

# python
RUN apk add --no-cache python3

# upgrade pip
RUN pip3 install --upgrade pip

# aws
RUN pip3 install awscli
RUN aws configure set region eu-west-1
RUN aws --version

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
COPY src ./src

RUN ls -lsa
CMD [ "node" ,"./src/app.js" ]
