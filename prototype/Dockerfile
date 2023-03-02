# build stage
# frontend
FROM node:16-alpine as fe-build-stage
WORKDIR /app
ARG VITE_API_API_DOMAIN
ARG VITE_API_DOMAINDEV_MODE
COPY ./frontend/package*.json .
RUN npm ci
COPY ./frontend/ .
RUN npm run build:ci

# backend
FROM node:16-alpine as be-build-stage
WORKDIR /app
COPY ./backend/package*.json .
RUN npm ci
COPY ./backend .
RUN npm run build
RUN mkdir ./build/views
RUN mkdir ./build/views/frontend
COPY --from=fe-build-stage /app/dist ./build/views/frontend


# production stage
FROM node:16-alpine as production-stage
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm ci
COPY --from=be-build-stage /app/build /app
EXPOSE 3000
CMD [ "node", "./main.js"]
