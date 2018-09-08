rs.initiate(
   {
      _id: "shard03",
      version: 1,
      members: [
         { _id: 0, host : "mongoshard03a:27020" },
         { _id: 1, host : "mongoshard03b:27020" },
      ]
   }
)
