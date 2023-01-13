migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av")

  // remove
  collection.schema.removeField("ir4a1haa")

  return dao.saveCollection(collection)
})
