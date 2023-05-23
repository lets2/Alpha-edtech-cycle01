# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /appback
COPY . .
RUN npm install
CMD ["node", "dist/server.js"]
EXPOSE 80