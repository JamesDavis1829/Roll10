migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0uant1z",
    "name": "weight",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "light",
        "medium",
        "heavy"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // remove
  collection.schema.removeField("q0uant1z")

  return dao.saveCollection(collection)
})
