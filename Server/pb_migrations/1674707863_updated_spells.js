migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "43lwzo9u",
    "name": "dice_roll",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": "^([\\+|-] (\\dd\\d|\\d);)+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "43lwzo9u",
    "name": "dice_roll",
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
