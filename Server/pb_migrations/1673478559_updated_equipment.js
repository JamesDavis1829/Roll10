migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4i69ykoa",
    "name": "strength_requirement",
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
    "id": "hhwvfzz3",
    "name": "agility_requirement",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fr54jii3",
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
    "id": "rgqqjlzb",
    "name": "wield",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "1 hand",
        "2 hands"
      ]
    }
  }))

  // add
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
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zbdkxteh",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0bw9eadv",
    "name": "category",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "weapon",
        "armor"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eicdwqiy",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxsi6fp9",
    "name": "range",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh")

  // remove
  collection.schema.removeField("4i69ykoa")

  // remove
  collection.schema.removeField("hhwvfzz3")

  // remove
  collection.schema.removeField("fr54jii3")

  // remove
  collection.schema.removeField("rgqqjlzb")

  // remove
  collection.schema.removeField("zzlh9w3a")

  // remove
  collection.schema.removeField("zbdkxteh")

  // remove
  collection.schema.removeField("rkyn64xe")

  // remove
  collection.schema.removeField("0bw9eadv")

  // remove
  collection.schema.removeField("eicdwqiy")

  // remove
  collection.schema.removeField("nxsi6fp9")

  return dao.saveCollection(collection)
})
