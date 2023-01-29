migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.createRule = "@request.auth.diceroom.id = room_id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.createRule = null

  return dao.saveCollection(collection)
})
