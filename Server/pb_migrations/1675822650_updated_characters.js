migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z5ncc3gl",
    "name": "strength",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ptfwfjx",
    "name": "agility",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "blp1wbxx",
    "name": "durability",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ukg5xlfq",
    "name": "stamina",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ghutzm6g",
    "name": "intelligence",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5fnpyzon",
    "name": "insight",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z5ncc3gl",
    "name": "strength",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ptfwfjx",
    "name": "agility",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "blp1wbxx",
    "name": "durability",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ukg5xlfq",
    "name": "stamina",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ghutzm6g",
    "name": "intelligence",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5fnpyzon",
    "name": "insight",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
