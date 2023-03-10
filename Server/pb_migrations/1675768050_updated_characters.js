migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "njjdudna",
    "name": "feats",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // remove
  collection.schema.removeField("njjdudna")

  return dao.saveCollection(collection)
})
