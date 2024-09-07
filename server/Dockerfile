FROM node:22
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5900
CMD [ "npm", "run", "start" ]