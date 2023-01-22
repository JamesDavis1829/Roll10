migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o4rnrsud",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 256,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o4rnrsud",
    "name": "field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
