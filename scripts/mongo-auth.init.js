admin = db.getSiblingDB("admin")
admin.createUser(
  {
    user: "admin",
    pwd: "admin@2018A",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
