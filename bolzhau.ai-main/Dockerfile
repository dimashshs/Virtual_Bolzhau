FROM node:alpine as build

COPY package*.json ./
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["npm", "start"]
