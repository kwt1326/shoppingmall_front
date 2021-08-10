FROM node:14-alpine3.14
ENV WORKDIRPATH=/app
RUN rm -rf node_modules
WORKDIR $WORKDIRPATH
COPY . $WORKDIRPATH
RUN npm i
CMD [ "PORT=3000" ]
ENTRYPOINT [ "npm", "run", "build" ]