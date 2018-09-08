Percona Server for MongoDB Sharded Cluster with Docker Compose
===============================================================
A simple sharded Mongo Cluster with a replication factor of 2 running in `docker` using `docker-compose`.

Designed to be quick and simple to get a local or test environment up and running. Needless to say... DON'T USE THIS IN PRODUCTION! *The current docker solutions, devicemapper, aufs and overlayfs have negative performance records*

The repository is forked from https://github.com/chefsplate/mongo-shard-docker-compose

### Mongo Components

* Config Server `mongocfg01`, `mongocfg02`, `mongocfg03`: Stores metadata for sharded data distribution (3 containers).
* 3 Shards (each a 2 member replica set): Mongod data server (6 containers).
	* `mongoshard01a`,`mongoshard01b`
	* `mongoshard02a`,`mongoshard02b`
	* `mongoshard03a`,`mongoshard03b`
* 2 Router `mongos01`, `mongos02`: Mongo routing service. Application will connect to router for query data (2 containers).

### First Run (initial setup)
** Create mongodb log and data path folder.

```
mkdir /mnserver/mongodb/{mongocfg01,mongocfg02,mongocfg03,mongoshard01a,mongoshard01b,mongoshard02a,mongoshard02b,mongoshard03a,mongoshard03b} -p
chown 1001:0 /mnserver/mongodb/ -R
mkdir /mnserver/logs/mongodb -p
chown 1001:0 /mnserver/logs/mongodb
```

**Start all of the containers** (daemonized)

```
docker-compose up -d
```

**Initialize the replica sets (config server and shards) and router**

```
sh init.sh
```

This script has a `sleep 30` to wait for the config server and shards to elect their primaries before initializing the router

**Verify the status of the sharded cluster**

```
docker-compose exec mongos01 mongo
mongos> sh.status()
--- Sharding Status ---
  sharding version: {
  	"_id" : 1,
  	"minCompatibleVersion" : 5,
  	"currentVersion" : 6,
  	"clusterId" : ObjectId("5b93eaff5cb7f799b38e6e8c")
  }
  shards:
        {  "_id" : "shard01",  "host" : "shard01/mongoshard01a:27018,mongoshard01b:27018",  "state" : 1 }
        {  "_id" : "shard02",  "host" : "shard02/mongoshard02a:27019,mongoshard02b:27019",  "state" : 1 }
        {  "_id" : "shard03",  "host" : "shard03/mongoshard03a:27020,mongoshard03b:27020",  "state" : 1 }
  active mongoses:
        "3.6.6-1.4" : 2
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours:
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                shard01	1
                        { "_id" : { "$minKey" : 1 } } -->> { "_id" : { "$maxKey" : 1 } } on : shard01 Timestamp(1, 0)
        {  "_id" : "ontime",  "primary" : "shard02",  "partitioned" : false }

mongos>
```

### Normal Startup
The cluster only has to be initialized on the first run. Subsequent startup can be achieved simply with `docker-compose up` or `docker-compose up -d`

### Accessing the Mongo Shell
Its as simple as:

```
docker-compose exec mongos01 mongo
```

### Resetting the Cluster
To remove all data and re-initialize the cluster, make sure the containers are stopped and then:

```
docker-compose rm
bash reset-sharded-cluster.sh
```

Execute the **First Run** instructions again.
