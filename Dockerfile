FROM node:16.18.1-buster

RUN apt update && apt install -y git
RUN git clone https://github.com/ONFoundation/ON.Web.git app

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]