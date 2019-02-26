
FROM node:9

RUN mkdir -p /opt/container/output

WORKDIR /opt

COPY ./package.json /opt/

RUN npm install

COPY ./ /opt/container

WORKDIR /opt/container

CMD [ "node", "consumer.js" ]
