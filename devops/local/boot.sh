#!/usr/bin/env bash

cd /var/www/html/ || exit

echo "Waiting for DB..."
sleep 5

npm install
npm run start:dev