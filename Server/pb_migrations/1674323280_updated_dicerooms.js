migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  // remove
  collection.schema.removeField("mfot0tyv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mfot0tyv",
    "name": "timstamp",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
