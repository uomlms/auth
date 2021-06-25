FROM node:alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]
