migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rkyn64xe",
    "name": "modifiers",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": "^([\\+|-] (str|agi|dur|sta|int|ins|armor);)+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rkyn64xe",
    "name": "modifiers",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
