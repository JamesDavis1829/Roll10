migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.listRule = "@request.auth.diceroom.id = room_id"
  collection.viewRule = "@request.auth.diceroom.id = room_id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
