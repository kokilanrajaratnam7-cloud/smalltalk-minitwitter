# Small Talk

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

# 3. Complete Installation Guide (Beginner Friendly)

Follow these steps exactly in order.

---

## STEP 1 – Install Git

Git is required to download the project.

1. Go to:  
  have to fill

2. Download Git for Windows

3. Install with default settings

4. Restart your computer

## Step 2 - Install Bun:

Open PowerShell and run:
powershell -c "irm bun.sh/install.ps1 | iex"

After installation verify: 
bun --version

## Step 3 - Start Docker:

Inside the project folder, run:
docker compose down
docker compose up -d --build

---

# 4. Start the Application

After the containers start successfully, open your browser:
http://localhost

---

# 5. Database Management (Drizzle)

Push schema:
bunx drizzle-kit push

Or inside Docker:
docker compose exec minitwitter bunx drizzle-kit push

Set environment variable (PowerShell):
$env:DATABASE_URL="postgresql://postgres:supersecret123@localhost:5432/minitwitter"

Open Drizzle Studio:
bunx drizzle-kit studio



docker exec -it ollama ollama pull tinyllama

docker exec -it ollama sh

ollama pull llama3


root@75d1daf7613b:/# pgbench -U postgres -d pgbench_test -c 50 -t 10000 -j 1
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
latency average = 40.940 ms
initial connection time = 3448.522 ms
tps = 1221.288022 (without initial connection time)
root@75d1daf7613b:/#

The database was benchmarked using pgbench with a scale factor of 100, resulting in approximately 10 million records. The test was executed with 50 concurrent clients and 10,000 transactions per client, totaling 500,000 transactions.

The system achieved an average throughput of 1221 transactions per second (TPS) with an average latency of 40.94 ms. No failed transactions were observed, indicating stable database performance under load.

Considering the benchmark was executed inside a Docker container on a local development environment, the performance can be evaluated as solid and stable.

& "C:\Program Files\k6\k6.exe" run load-test.js

PS C:\Users\kokil\OneDrive - TEKO Schweizerische Fachschule AG\Dokumente\Smalltalk_Kokilan\smalltalk-minitwitter> & "C:\Program Files\k6\k6.exe" run load-test.js

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

    checks_total.......: 10000   458.777051/s
    checks_succeeded...: 100.00% 10000 out of 10000
    checks_failed......: 0.00%   0 out of 10000

    ✓ status is 200

    HTTP
    http_req_duration..............: avg=21.32ms min=4.55ms med=18.21ms max=149.41ms p(90)=37.44ms p(95)=44.8ms
      { expected_response:true }...: avg=21.32ms min=4.55ms med=18.21ms max=149.41ms p(90)=37.44ms p(95)=44.8ms
    http_req_failed................: 0.00%  0 out of 10000
    http_reqs......................: 10000  458.777051/s

    EXECUTION
    iteration_duration.............: avg=21.7ms  min=4.65ms med=18.64ms max=149.41ms p(90)=38.05ms p(95)=45.36ms
    iterations.....................: 10000  458.777051/s
    vus............................: 10     min=10         max=10
    vus_max........................: 10     min=10         max=10

    NETWORK
    data_received..................: 8.0 MB 368 kB/s
    data_sent......................: 700 kB 32 kB/s



                                                                                                                                              
running (00m21.8s), 00/10 VUs, 10000 complete and 0 interrupted iterations                                                                    
default ✓ [======================================] 10 VUs  00m21.8s/10m0s  10000/10000 shared iters 

The API was tested using k6 with 10 virtual users and 10,000 total requests.
The system achieved an average response time of 21.32 ms and a 95th percentile latency of 44.8 ms.
No failed requests were observed, resulting in a 0% error rate.
The throughput reached approximately 458 requests per second.

These results demonstrate stable and performant API behavior under concurrent load in a containerized environment with Redis caching and horizontal scaling.

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

    checks_total.......: 10000   276.427541/s
    checks_succeeded...: 100.00% 10000 out of 10000
    checks_failed......: 0.00%   0 out of 10000

    ✓ status is 200

    HTTP
    http_req_duration..............: avg=35.74ms min=5.01ms med=31.47ms max=246.8ms p(90)=63.62ms p(95)=76.28ms
      { expected_response:true }...: avg=35.74ms min=5.01ms med=31.47ms max=246.8ms p(90)=63.62ms p(95)=76.28ms
    http_req_failed................: 0.00%  0 out of 10000
    http_reqs......................: 10000  276.427541/s

    EXECUTION
    iteration_duration.............: avg=36.12ms min=5.01ms med=31.83ms max=246.8ms p(90)=64.05ms p(95)=76.88ms
    iterations.....................: 10000  276.427541/s
    vus............................: 10     min=10         max=10
    vus_max........................: 10     min=10         max=10

    NETWORK
    data_received..................: 9.0 MB 249 kB/s
    data_sent......................: 700 kB 19 kB/s


A performance comparison was conducted using k6 with identical parameters (10 virtual users, 10,000 requests).

Without Redis caching, the API achieved an average latency of 35.74 ms and a throughput of 276 requests per second.

After enabling Redis caching, the average latency decreased to 21.32 ms, and throughput increased to 458 requests per second.

This corresponds to a latency reduction of approximately 40% and a throughput increase of approximately 66%.

The results clearly demonstrate the effectiveness of Redis as a caching layer in reducing database load and improving API performance.



         /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 


     execution: local
        script: load-test.js
        output: -

     scenarios: (100.00%) 1 scenario, 50 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 5000 iterations shared among 50 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ TOTAL RESULTS

    checks_total.......: 5000   617.87586/s
    checks_succeeded...: 3.94%  197 out of 5000
    checks_failed......: 96.06% 4803 out of 5000

    ✗ status is 200
      ↳  3% — ✓ 197 / ✗ 4803

    HTTP
    http_req_duration..............: avg=80.01ms  min=4.88ms  med=69.25ms  max=876ms    p(90)=111.38ms p(95)=138.65ms
      { expected_response:true }...: avg=381.78ms min=10.53ms med=384.79ms max=876ms    p(90)=739.88ms p(95)=787.98ms
    http_req_failed................: 96.06% 4803 out of 5000
    http_reqs......................: 5000   617.87586/s

    EXECUTION
    iteration_duration.............: avg=80.47ms  min=4.88ms  med=69.69ms  max=877.11ms p(90)=111.91ms p(95)=138.9ms
    iterations.....................: 5000   617.87586/s
    vus............................: 50     min=50           max=50
    vus_max........................: 50     min=50           max=50

    NETWORK
    data_received..................: 2.2 MB 272 kB/s
    data_sent......................: 350 kB 43 kB/s





A rate limiter was implemented using express-rate-limit to protect the API against excessive traffic.

During stress testing with 50 virtual users and 5000 requests, approximately 96% of requests were blocked with HTTP status 429 after exceeding the configured limit.

The system remained stable under high load conditions, demonstrating proper protection against request flooding and potential denial-of-service attacks.
                                                         