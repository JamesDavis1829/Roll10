migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.viewRule = ""
  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.viewRule = null
  collection.createRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
