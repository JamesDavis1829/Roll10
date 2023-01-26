migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s")

  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s")

  collection.viewRule = ""

  return dao.saveCollection(collection)
})
