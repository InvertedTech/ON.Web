FROM node:16.4.2-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

ENV NUXT_HOST=0.0.0.0
EXPOSE 3000
CMD [ "npm", "start" ]