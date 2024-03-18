sh.enableSharding("mongo_db");
sh.shardCollection("mongo_db.shops", {"_id": 1});