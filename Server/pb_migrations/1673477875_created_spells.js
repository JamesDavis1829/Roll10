migrate((db) => {
  const collection = new Collection({
    "id": "949ng0ghxx81lc7",
    "created": "2023-01-11 22:57:55.195Z",
    "updated": "2023-01-11 22:57:55.195Z",
    "name": "spells",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3ynifrdj",
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
  const collection = dao.findCollectionByNameOrId("949ng0ghxx81lc7");

  return dao.deleteCollection(collection);
})
