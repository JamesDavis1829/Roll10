migrate((db) => {
  const collection = new Collection({
    "id": "4fykika6jtuwlbh",
    "created": "2023-01-11 22:57:06.229Z",
    "updated": "2023-01-11 22:57:06.229Z",
    "name": "equipment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9vhbezos",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 250,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4fykika6jtuwlbh");

  return dao.deleteCollection(collection);
})
