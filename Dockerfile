FROM node:16

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]


# docker build . -t volmir/node-web-app
# docker run -p 3001:3000 -d volmir/node-web-app