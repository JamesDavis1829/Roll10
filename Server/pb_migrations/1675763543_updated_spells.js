migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvbhpt6e",
    "name": "school",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Arcane",
        "Divine",
        "Natural"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // remove
  collection.schema.removeField("zvbhpt6e")

  return dao.saveCollection(collection)
})
