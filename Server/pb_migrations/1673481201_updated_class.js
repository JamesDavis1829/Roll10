migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // remove
  collection.schema.removeField("9wlvta1v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "19fjiqex",
    "name": "equipment",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "collectionId": "4fykika6jtuwlbh",
      "cascadeDelete": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cpnznev9",
    "name": "inventory",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "collectionId": "4fykika6jtuwlbh",
      "cascadeDelete": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ir4a1haa",
    "name": "spells",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "collectionId": "949ng0ghxx81lc7",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9wlvta1v",
    "name": "starting_equipment",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "collectionId": "4fykika6jtuwlbh",
      "cascadeDelete": false
    }
  }))

  // remove
  collection.schema.removeField("19fjiqex")

  // remove
  collection.schema.removeField("cpnznev9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ir4a1haa",
    "name": "starting_spells",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 50,
      "collectionId": "949ng0ghxx81lc7",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
