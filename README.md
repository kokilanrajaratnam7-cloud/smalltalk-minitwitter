# Microblogging Plattform – Transferarbeit

                                    ┌──────────────────────┐
                                    │        USER          │
                                    │   Browser / Client   │
                                    └──────────┬───────────┘
                                               │
                                               ▼
                                    ┌──────────────────────┐
                                    │       FRONTEND       │
                                    │   HTML / CSS / JS    │
                                    └──────────┬───────────┘
                                               │ API Calls
                                               ▼
                                    ┌──────────────────────┐
                                    │  NGINX REVERSE PROXY │
                                    │    Load Balancer     |
                                    |      container       |
                                    └───────┬─────┬────────┘
                                            │     │
                                            ▼     ▼
                              ┌────────────────┐ ┌────────────────┐
                              │  Minitwitter 1 │ │  Minitwitter 2 │
                              │  Bun + TS API  │ │  Bun + TS API  │
                              └────────┬───────┘ └────────┬───────┘
                                       │                  │
                            ┌──────────┴──────────┐ ┌─────┴─────────┐
                            ▼                     ▼ ▼               ▼
                    ┌───────────────┐     ┌───────────────┐   ┌───────────────┐
                    │  PostgreSQL   │     │     Redis     │   │  AI Moderation│
                    │   Database    │     │     Cache     │   │     Ollama    │
                    └───────────────┘     └───────────────┘   └───────────────┘


                            ┌───────────────────────────────┐
                            │        MONITORING             │
                            │   Prometheus → Grafana        │
                            └───────────────────────────────┘

## 1. Ausgangslage

In diesem Projekt wurde eine einfache Microblogging-Plattform entwickelt.
Die Anwendung ermöglicht es Benutzern, kurze Beiträge (Posts) zu erstellen, zu bearbeiten und zu löschen.

Ziel der Arbeit ist es, eine moderne Webanwendung mit einer klaren Architektur zu entwickeln und typische Funktionen einer Social-Media-Plattform umzusetzen.

## 2. Ziel der Anwendung

Die Anwendung soll folgende Funktionen ermöglichen:
- Benutzer können sich registrieren
- Benutzer können sich anmelden (Login)
- Benutzer können Posts erstellen
- Benutzer können ihre eigenen Posts bearbeiten
- Benutzer können ihre eigenen Posts löschen
- Alle Benutzer können die Posts sehen
Damit wird ein einfaches Social-Media-System umgesetzt.

## 3. Verwendete Technologien
### Backend

Das Backend wurde mit folgenden Technologien entwickelt:
- TypeScript
- Bun Runtime
- REST API
- JWT Authentication
Das Backend stellt eine API zur Verfügung, über welche das Frontend mit dem Server kommuniziert.

### Frontend

Das Frontend wurde als Weboberfläche umgesetzt.
Funktionen:
- Login
- Registrierung
- Post erstellen
- Post bearbeiten
- Post löschen
- Posts anzeigen

### Datenbank / Persistenz

Für die Speicherung der Daten wird eine relationale Datenbank verwendet.
Die Kommunikation mit der Datenbank erfolgt über **Drizzle ORM**.  
Drizzle ist ein TypeScript ORM und Query Builder, der eine typsichere Interaktion mit der Datenbank ermöglicht.
Mit Drizzle werden Tabellen für **Benutzer** und **Posts** definiert. Über das Backend können diese Daten erstellt, gelesen, aktualisiert und gelöscht werden (CRUD-Operationen).
Die Datenbank speichert unter anderem:
- Benutzerinformationen (User)
- Beiträge der Benutzer (Posts)
Ein Benutzer kann mehrere Posts erstellen.

## 4. Architektur der Anwendung

Die Anwendung folgt dem Client-Server-Prinzip.
- Das Frontend ist der Client.
- Das Backend stellt eine REST API bereit.
- Die Datenbank speichert Benutzer und Posts.

Der Ablauf:
1. Benutzer sendet Anfrage über das Frontend
2. Anfrage geht an das Backend (API)
3. Backend verarbeitet die Anfrage
4. Daten werden in der Datenbank gespeichert oder gelesen
5. Backend sendet Antwort an das Frontend

## 5. Sicherheit

Für die Anmeldung wird eine Token-basierte Authentifizierung (JWT) verwendet.
Ablauf:
1. Benutzer meldet sich an
2. Server erstellt ein Token
3. Token wird bei weiteren API-Anfragen mitgesendet
4. Backend prüft das Token und erlaubt nur autorisierte Aktionen
Dadurch wird sichergestellt, dass nur eingeloggte Benutzer Posts erstellen oder verändern können.

## 6. Fazit

Mit diesem Projekt wurde eine funktionierende Microblogging-Plattform entwickelt.
Dabei wurden typische Konzepte moderner Webentwicklung umgesetzt, wie REST APIs, Authentifizierung und Client-Server-Architektur.

Die Anwendung zeigt, wie ein einfaches Social-Media-System technisch aufgebaut werden kann.

---

# Welcome to Small Talk

<p align="center">
  <img src="./frontend/assets/smalltalklogo.png" width="180" alt="Small Talk Logo" />
</p>

<p align="center">
  <strong>A Minimal Twitter-like Social Media Application</strong>
</p>

---

# 1. What is Small Talk?

Small Talk is a mini Twitter-like web application.

Users can:
- Register an account
- Login
- Create posts
- Edit posts
- Delete posts
- View all posts

This project was created as a school assignment to demonstrate:
- Backend development
- JWT authentication
- REST API design
- PostgreSQL database usage
- Drizzle ORM
- Docker containerization

---

# 2. Technologies Used

- Bun (JavaScript runtime)
- Express (Backend framework)
- PostgreSQL (Database)
- Drizzle ORM (Database schema & query tool)
- JWT (Authentication system)
- Docker & Docker Compose (Container system)

---

# 3. Complete Instruction and Commands Guide (Beginner Friendly)

Follow these steps exactly.

## To Start and Stop Docker:

- docker compose down
- docker compose up --build

## Start the Application

After the containers start successfully, open your browser:
http://localhost

## Database Management (Drizzle)

- Push schema: bunx drizzle-kit push
- Open Drizzle Studio: bunx drizzle-kit studio
- env file - DATABASE_URL=postgresql://postgres:supersecret123@localhost:5432/minitwitter
             JWT_SECRET=mysupersecretkey

## Ollama 

- docker exec -it ollama sh
- ollama pull llama3

You can also download other ollama model. 

## Run the k6 test

- k6 run load-test.js

## Stop and Start Redis

- docker stop redis
- docker compose start redis

## pgbench

- docker exec -it my-postgres bash (Enter the container)
- createdb -U postgres pgbench_test (Create benchmark database, if already exsit just avoid)
- pgbench -i -s 100 -U postgres pgbench_test (Generate benchmark data, wait untill it finishes)
- pgbench -U postgres -d pgbench_test -c 50 -t 10000 -j 1 (Run the benchmark)

---

# Perfomance Test Result

## result with Redis


         /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 


     execution: local
        script: load-test.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 10000 iterations shared among 10 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ TOTAL RESULTS

    checks_total.......: 10000   404.240122/s
    checks_succeeded...: 100.00% 10000 out of 10000
    checks_failed......: 0.00%   0 out of 10000

    ✓ status is 200

    HTTP
    http_req_duration..............: avg=24.3ms  min=4.9ms med=20.67ms max=190.44ms p(90)=40.57ms p(95)=48.24ms
      { expected_response:true }...: avg=24.3ms  min=4.9ms med=20.67ms max=190.44ms p(90)=40.57ms p(95)=48.24ms
    http_req_failed................: 0.00%  0 out of 10000
    http_reqs......................: 10000  404.240122/s

    EXECUTION
    iteration_duration.............: avg=24.68ms min=4.9ms med=21.09ms max=190.44ms p(90)=40.95ms p(95)=48.69ms
    iterations.....................: 10000  404.240122/s
    vus............................: 10     min=10         max=10
    vus_max........................: 10     min=10         max=10

    NETWORK
    data_received..................: 6.4 MB 260 kB/s
    data_sent......................: 700 kB 28 kB/s




running (00m24.7s), 00/10 VUs, 10000 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  00m24.7s/10m0s  10000/10000 shared iters

## result without Redis



         /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 


     execution: local
        script: load-test.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 10000 iterations shared among 10 VUs (maxDuration: 10m0s, gracefulStop: 30s)

WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0060] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0125] Request Failed                                error="Get \"http://localhost/posts\": request timeout"
WARN[0125] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0125] Request Failed                                error="Get \"http://localhost/posts\": request timeout"
WARN[0125] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0125] Request Failed                                error="Get \"http://localhost/posts\": request timeout"                   
WARN[0125] Request Failed                                error="Get \"http://localhost/posts\": request timeout"


  █ TOTAL RESULTS

    checks_total.......: 10000   76.019515/s
    checks_succeeded...: 0.00%   0 out of 10000
    checks_failed......: 100.00% 10000 out of 10000

    ✗ status is 200
      ↳  0% — ✓ 0 / ✗ 10000

    HTTP
    http_req_duration....: avg=131.14ms min=1.27ms med=4.73ms max=1m0s p(90)=8.81ms p(95)=11.01ms
    http_req_failed......: 100.00% 10000 out of 10000
    http_reqs............: 10000   76.019515/s

    EXECUTION
    iteration_duration...: avg=131.49ms min=1.27ms med=4.98ms max=1m0s p(90)=9.19ms p(95)=11.51ms
    iterations...........: 10000   76.019515/s
    vus..................: 10      min=10             max=10
    vus_max..............: 10      min=10             max=10

    NETWORK
    data_received........: 3.1 MB  24 kB/s
    data_sent............: 700 kB  5.3 kB/s



                                                                                                                                   
running (02m11.5s), 00/10 VUs, 10000 complete and 0 interrupted iterations                                                         
default ✓ [======================================] 10 VUs  02m11.5s/10m0s  10000/10000 shared iters                                

## k6 result summary

### WITHOUT Redis

Important numbers from output:

Metric	Result
Requests	10000
Virtual Users	10
Avg Response Time	131 ms
Requests/sec	76 req/s
Failed Requests	100%
Errors	request timeout

Reason: Redis cache was disabled → database became bottleneck.

### WITH Redis 
Metric	Result
Requests	10000
Virtual Users	10
Avg Response Time	24.3 ms
Requests/sec	404 req/s
Failed Requests	0%

### Comparison
Test	                Avg Response Time	Requests/sec	Failed Requests
Without Redis Cache	    131 ms	            76 req/s	    100%
With Redis Cache	    24.3 ms	            404 req/s	    0%

### Short explanation

API Performance Test (k6)

The API performance was tested using k6 with 10 virtual users and 10,000 requests.

Without Redis caching the API experienced timeouts and significantly slower response times, with an average latency of 131 ms and 76 requests per second.

With Redis caching enabled the system handled all requests successfully with an average response time of 24.3 ms and 404 requests per second.

The test demonstrates that Redis caching significantly improves API performance and system stability under load.


## pgbench result

root@e5142db4c1df:/# createdb -U postgres pgbench_test
createdb: error: database creation failed: ERROR:  database "pgbench_test" already exists
root@e5142db4c1df:/# pgbench -i -s 100 -U postgres pgbench_test
dropping old tables...
creating tables...
generating data (client-side)...
vacuuming...
creating primary keys...
done in 559.12 s (drop tables 0.41 s, create tables 0.26 s, client-side generate 456.89 s, vacuum 7.35 s, primary keys 94.21 s).   
root@e5142db4c1df:/# pgbench -U postgres -d pgbench_test -c 50 -t 10000 -j 1
pgbench (18.3 (Debian 18.3-1.pgdg13+1))
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 100
query mode: simple
number of clients: 50
number of threads: 1
maximum number of tries: 1
number of transactions per client: 10000
number of transactions actually processed: 500000/500000
number of failed transactions: 0 (0.000%)
latency average = 51.088 ms
initial connection time = 4318.102 ms
tps = 978.706352 (without initial connection time)

## Monitoring
- Grafana http://localhost:3001/login
- Prometheus http://localhost:9090/query

- login: admin/admin (1234)
- http://prometheus:9090




                                                         