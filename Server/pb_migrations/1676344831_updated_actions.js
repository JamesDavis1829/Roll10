migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8dulaafg",
    "name": "dslEquation",
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
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // remove
  collection.schema.removeField("8dulaafg")

  return dao.saveCollection(collection)
})
