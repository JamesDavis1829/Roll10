migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iamwet0j",
    "name": "is_public",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // remove
  collection.schema.removeField("iamwet0j")

  return dao.saveCollection(collection)
})
