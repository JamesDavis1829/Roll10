migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2yhlqp3b",
    "name": "room_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "b4fh36ktdpgma9s",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2yhlqp3b",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "b4fh36ktdpgma9s",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
})
