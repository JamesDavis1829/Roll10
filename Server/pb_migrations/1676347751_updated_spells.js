migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fqa9qu5d",
    "name": "humanReadableEffect",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 500,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // remove
  collection.schema.removeField("fqa9qu5d")

  return dao.saveCollection(collection)
})
