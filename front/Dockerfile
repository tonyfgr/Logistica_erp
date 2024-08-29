FROM node:18-alpine

WORKDIR /front

EXPOSE 3000

# RUN npm install vite

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .

CMD ["npm", "run", "dev"]