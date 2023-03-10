migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vvzunjz3",
    "name": "level",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 3
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // remove
  collection.schema.removeField("vvzunjz3")

  return dao.saveCollection(collection)
})
