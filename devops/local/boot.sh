#!/usr/bin/env bash

cd /var/www/html/ || exit

echo "Waiting for DB..."
sleep 5

npm install
npm i -g typeorm
npm run typeorm migration:run
NODE_ENV=test npm run typeorm migration:run
npm run start:dev