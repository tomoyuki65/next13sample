FROM node:18.13.0
RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm ci

EXPOSE 3000
CMD ["npm", "run", "dev"]