migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  collection.name = "characters"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  collection.name = "class"

  return dao.saveCollection(collection)
})
