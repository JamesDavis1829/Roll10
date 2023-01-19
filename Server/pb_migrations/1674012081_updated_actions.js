migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "st45pqzk",
    "name": "all_characters",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // remove
  collection.schema.removeField("st45pqzk")

  return dao.saveCollection(collection)
})
