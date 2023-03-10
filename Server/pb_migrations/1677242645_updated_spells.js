migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gikvftpg",
    "name": "cost",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // remove
  collection.schema.removeField("gikvftpg")

  return dao.saveCollection(collection)
})
