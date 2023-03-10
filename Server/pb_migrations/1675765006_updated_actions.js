migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fedleptj",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "standard",
        "attack"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // remove
  collection.schema.removeField("fedleptj")

  return dao.saveCollection(collection)
})
