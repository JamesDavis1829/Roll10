migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4qc8qmjj",
    "name": "add_base_dice",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // remove
  collection.schema.removeField("4qc8qmjj")

  return dao.saveCollection(collection)
})
