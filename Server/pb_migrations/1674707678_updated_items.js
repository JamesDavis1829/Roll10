migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zzlh9w3a",
    "name": "action_effect",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": "^([\\+|-] \\d (sta|hp);)+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zzlh9w3a",
    "name": "action_effect",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": "([\\+|-] \\d (sta|hp);)+"
    }
  }))

  return dao.saveCollection(collection)
})
