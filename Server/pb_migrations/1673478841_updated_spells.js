migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcsuj1rd",
    "name": "action_effect",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": ""
    }
  }))

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "019ivgh5",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pjhlxxx2",
    "name": "intelligence_requirement",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 30
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "naaar4el",
    "name": "range",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zerwnaxw",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 1000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7")

  // remove
  collection.schema.removeField("qcsuj1rd")

  // remove
  collection.schema.removeField("43lwzo9u")

  // remove
  collection.schema.removeField("019ivgh5")

  // remove
  collection.schema.removeField("pjhlxxx2")

  // remove
  collection.schema.removeField("naaar4el")

  // remove
  collection.schema.removeField("zerwnaxw")

  return dao.saveCollection(collection)
})
