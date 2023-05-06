FROM node
WORKDIR /frontend
COPY . ./
RUN npm i
CMD ["npm", "run", "dev"]