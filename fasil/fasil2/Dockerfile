FROM node

WORKDIR /app/stack_holder_profile

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "start"]