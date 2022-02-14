FROM node:14

WORKDIR /app

COPY package.json package.json
COPY . .
RUN yarn install
RUN npm install -g serve
RUN yarn build

CMD serve -s ./build -p 80
