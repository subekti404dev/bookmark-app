FROM node:14.20.0-alpine as base

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn build

FROM node:14.20.0-alpine
ENV PORT=2000
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY . .

EXPOSE 2000
CMD [ "yarn", "start" ]
