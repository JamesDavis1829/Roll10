migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  collection.name = "items"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  collection.name = "equipment"

  return dao.saveCollection(collection)
})
