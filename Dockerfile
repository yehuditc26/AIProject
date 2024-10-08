FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
EXPOSE 8989
COPY . .
RUN chown -R node /usr/src/app
USER node
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
CMD ["node", "app.js"]



