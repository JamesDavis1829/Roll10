migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.listRule = ""
  collection.createRule = ""
  collection.deleteRule = ""

  // remove
  collection.schema.removeField("kpnirrck")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  collection.listRule = null
  collection.createRule = null
  collection.deleteRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kpnirrck",
    "name": "room_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 256,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("2yhlqp3b")

  return dao.saveCollection(collection)
})
