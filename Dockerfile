FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]
RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && yarn install \
    && apk del .gyp
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["node", "./index.js"]
