migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("na9v1vc7838apuy")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("na9v1vc7838apuy")

  collection.listRule = null

  return dao.saveCollection(collection)
})
