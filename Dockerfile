FROM node:20 AS BUILDER

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/list_client/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
