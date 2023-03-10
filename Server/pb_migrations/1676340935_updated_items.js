migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uix9nvem",
    "name": "dslEquation",
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
  collection.schema.removeField("uix9nvem")

  return dao.saveCollection(collection)
})
