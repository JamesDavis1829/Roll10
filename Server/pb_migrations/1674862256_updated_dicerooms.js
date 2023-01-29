migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s")

  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s")

  collection.createRule = ""

  return dao.saveCollection(collection)
})
