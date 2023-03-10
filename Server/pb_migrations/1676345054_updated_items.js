migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjrnxcx5",
    "name": "humanReadable",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 500,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // remove
  collection.schema.removeField("vjrnxcx5")

  return dao.saveCollection(collection)
})
