#!/bin/bash

docker-compose exec mongocfg01 sh -c "mongo --port 27017 < /scripts/init-configserver.js"
docker-compose exec mongoshard01a sh -c "mongo --port 27018 < /scripts/init-shard01.js"
docker-compose exec mongoshard02a sh -c "mongo --port 27019 < /scripts/init-shard02.js"
docker-compose exec mongoshard03a sh -c "mongo --port 27020 < /scripts/init-shard03.js"
sleep 30
docker-compose exec mongos01 sh -c "mongo < /scripts/init-router.js"
docker-compose exec mongos02 sh -c "mongo < /scripts/init-router.js"
