# **Prototyp**

## **Setup in Docker-Container für lokales Testing**

### Pre-Requisites

- [docker](https://docs.docker.com/engine/install/)
- [docker compose](https://docs.docker.com/compose/install/)

### _Für den Email-Versand wird ein Test-Account bei [Ethereal](https://ethereal.email/) benötigt_

> Hierzu kann entweder über die Website ein Account erstellt werden oder dieser Befehl ausgeführt werden:

    npm run emailGen

> Die Zugangsdaten müssen dann in einer erstellten `.env`-Datei im `backend`-Ordner eingetragen werden.
> Um die Emails zu empfangen, muss die URL aus der Konsole in einem Browser geöffnet werden oder der Login auf der Website verwendet werden.

> Zum Bauen und Starten aller Services:

    docker compose up -d

> Die Anwendung ist dann erreichbar unter

- [http://localhost:3000](http://localhost:3000)

---

## **lokales Development Setup**

### Pre-Requisites

- [docker](https://docs.docker.com/engine/install/)
- [docker compose](https://docs.docker.com/compose/install/)
- [nodejs + npm](https://nodejs.org/en)

### _Für den Email-Versand wird ein Test-Account bei [Ethereal](https://ethereal.email/) benötigt_

> Hierzu kann entweder über die Website ein Account erstellt werden oder dieser Befehl ausgeführt werden:

    npm run emailGen

> Die Zugangsdaten müssen dann in einer erstellten `.env`-Datei im `backend`-Ordner eingetragen werden.
> Um die Emails zu empfangen, muss die URL aus der Konsole in einem Browser geöffnet werden oder der Login auf der Website verwendet werden.

### Für das initiale Setup des Prototypen:

    npm i
    npm run setup
    docker compose docker-compose.local.yml up -d

### Das Starten des Prototypen:

    npm run start

> Die Anwendung ist dann erreichbar unter

- frontend: [http://localhost:8080](http://localhost:8080)
- backend: [http://localhost:3000](http://localhost:3000)

# Nach dem erfolgreichen Starten des Prototypen im lokalen Setup

> Lokal wird automatisch ein TestUser mit den folgenden Zugangsdaten erstellt, mit denen sofort die Anwendung getestet werden kann:

Email: test@user

Password: Test1234

---

### Beispiel-Umgebungsvariablen für `.env` in `backend`:

> Diese Variablen werden nicht benötigt, außer die sollten explizit angepasst werden wollen.

    PORT = 3000
    SECRET = 'DiesDasAnanas'
    MONGO_DB = 'prototype'
    DEV_MODE = 'true'
    CLIENT_APP_URL = 'http://localhost:8080'
    SMTP_PASS='pass' (hier sollten die generierten Daten von ethereal eingetragen werden)
    SMTP_USER='user' (hier sollten die generierten Daten von ethereal eingetragen werden)
