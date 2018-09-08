rs.initiate(
   {
      _id: "configserver",
      configsvr: true,
      version: 1,
      members: [
         { _id: 0, host : "mongocfg01:27017" },
         { _id: 1, host : "mongocfg02:27017" },
         { _id: 2, host : "mongocfg03:27017" }
      ]
   }
)
