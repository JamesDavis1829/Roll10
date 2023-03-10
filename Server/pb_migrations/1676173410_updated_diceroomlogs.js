migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ugnc4oaq",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 150,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  // remove
  collection.schema.removeField("ugnc4oaq")

  return dao.saveCollection(collection)
})
