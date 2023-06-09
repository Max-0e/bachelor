# Prototyp

## setup in Docker-Container für lokales testing

### Pre-Requisites

- [docker](https://docs.docker.com/engine/install/)
- [docker compose](https://docs.docker.com/compose/install/)

zum Starten aller Services:

    docker compose up -d

## lokales development Setup

### Pre-Requisites

- [docker](https://docs.docker.com/engine/install/)
- [docker compose](https://docs.docker.com/compose/install/)
- [nodejs + npm](https://nodejs.org/en)

### Für das initiale Setup des Prototypen:

    npm i
    npm run setup
    docker compose docker-compose.local.yml up -d

### das Starten des Prototypen:

    npm run start

### Beispiel-Umgebungsvariablen für `.env` in `backend`:

Diese Variablen werden nicht benötigt, außer die sollten explizit angepasst werden wollen.

    PORT = 3000
    SECRET = 'DiesDasAnanas'
    MONGO_DB = 'prototype'
    DEV_MODE = 'true'
    CLIENT_APP_URL = 'http://localhost:8080'
