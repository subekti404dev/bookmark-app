FROM node:14.20.0-alpine as base

WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:14.20.0-alpine
ENV PORT=2000
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN  yarn build

EXPOSE 2000
CMD [ "yarn", "start" ]
