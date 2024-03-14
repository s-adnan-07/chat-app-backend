FROM  node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock  ./

RUN yarn

COPY . .

RUN yarn build

RUN rm -rf ./src