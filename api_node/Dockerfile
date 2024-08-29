FROM node:16

WORKDIR /api_node
 
COPY ["package.json", "package-lock.json*", "./"] 
RUN npm i
RUN npm i -g nodemon
COPY . .
EXPOSE 8000
 
CMD ["node", "server.js"]