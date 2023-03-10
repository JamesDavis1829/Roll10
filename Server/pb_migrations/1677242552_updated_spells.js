migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lonssvjz",
    "name": "insight_requirement",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 8,
      "max": 25
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // remove
  collection.schema.removeField("lonssvjz")

  return dao.saveCollection(collection)
})
