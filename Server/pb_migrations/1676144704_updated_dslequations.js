migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("na9v1vc7838apuy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npco0fyj",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("na9v1vc7838apuy")

  // remove
  collection.schema.removeField("npco0fyj")

  return dao.saveCollection(collection)
})
