migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rnybchey",
    "name": "actions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "collectionId": "5fzey1g4upf9lw2",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // remove
  collection.schema.removeField("rnybchey")

  return dao.saveCollection(collection)
})
