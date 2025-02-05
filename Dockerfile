FROM node

WORKDIR /usr/src/app

COPY dist/ .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "."]