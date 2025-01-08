FROM node:20-slim
WORKDIR /app
COPY package*.json ./
COPY . .
CMD [ "npm", "start" ]
EXPOSE 3000