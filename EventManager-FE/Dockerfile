FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BACKEND_URL=http://localhost:5000
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000
