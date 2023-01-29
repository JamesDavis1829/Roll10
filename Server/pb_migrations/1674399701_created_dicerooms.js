migrate((db) => {
  const collection = new Collection({
    "id": "b4fh36ktdpgma9s",
    "created": "2023-01-22 15:01:41.352Z",
    "updated": "2023-01-22 15:01:41.352Z",
    "name": "dicerooms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "o4rnrsud",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
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
  const collection = dao.findCollectionByNameOrId("b4fh36ktdpgma9s");

  return dao.deleteCollection(collection);
})
