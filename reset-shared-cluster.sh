#!/bin/bash
docker-compose down
rm /mnserver/mongodb/{mongocfg01,mongocfg02,mongocfg03,mongoshard01a,mongoshard01b,mongoshard02a,mongoshard02b,mongoshard03a,mongoshard03b}/* -rf
rm /mnserver/logs/mongodb/* -f
