rs.initiate(
   {
      _id: "shard02",
      version: 1,
      members: [
         { _id: 0, host : "mongoshard02a:27019" },
         { _id: 1, host : "mongoshard02b:27019" },
      ]
   }
)
