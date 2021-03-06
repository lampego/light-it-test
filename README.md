## Tests status

[![Build Status](https://lampego.visualstudio.com/Shared/_apis/build/status/LightIt%20API%20tests?branchName=main)](https://lampego.visualstudio.com/Shared/_build/latest?definitionId=5&branchName=main)

## Deploy local environment

`cd devops/local`
`cp .env.example .env`
`sudo docker-compose up` or `docker-compose up`

### Connect to the container

`sudo docker exec -ti lightit-test-api-local bash` or `docker exec -ti lightit-test-api-local bash`

### Run migrations for Main DB

`sudo docker exec -ti lightit-test-api-local npm run -- typeorm migration:run`

### Run migrations for Test DB

`sudo docker exec --env NODE_ENV=test -ti lightit-test-api-local npm run -- typeorm migration:run`

### Run tests

`sudo docker exec -ti lightit-test-api-local npm run -- test:e2e`

or

`sudo docker exec -ti lightit-test-api-local npm run -- test:e2e-watch`