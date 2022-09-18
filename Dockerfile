FROM node:16.14.0-alpine3.14 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install -g npm
RUN npm install -g @nestjs/cli
RUN npm install -g rimraf
RUN npm install -g husky
RUN npm install

COPY . .

RUN npm run build

FROM node:16.14.0-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install -g npm
RUN npm install -g @nestjs/cli
RUN npm install -g rimraf
RUN npm install -g husky
RUN npm install

COPY . .

RUN npm run build

COPY --from=development /usr/src/app .

EXPOSE 4000

CMD ["npm", "start"]