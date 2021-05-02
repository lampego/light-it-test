## Tests status

[![Build Status](https://lampego.visualstudio.com/Shared/_apis/build/status/LightIt%20API%20tests?branchName=main)](https://lampego.visualstudio.com/Shared/_build/latest?definitionId=5&branchName=main)

## Deploy local environment

`cd devops/local`
`cp .env.example .env`
`sudo docker-compose up` or `docker-compose up`

### Connect to the container

`sudo docker exec -ti lightit-test-api-local bash` or `docker exec -ti lightit-test-api-local bash`

### Run migrations

`sudo docker exec -ti lightit-test-api-local npm run -- typeorm migration:run`

### Run tests

`sudo docker exec -ti lightit-test-api-local npm run -- test:e2e`