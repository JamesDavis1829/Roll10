migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "36pr8tgy",
    "name": "dice_roll",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 256,
      "pattern": "^([\\+|-] (\\dd\\d|\\d);)+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "36pr8tgy",
    "name": "dice_roll",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 256,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
