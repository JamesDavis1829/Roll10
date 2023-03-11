migrate((db) => {
  const collection = new Collection({
    "id": "iz7n4slz8ubtjhu",
    "created": "2023-03-10 23:45:23.790Z",
    "updated": "2023-03-10 23:45:23.790Z",
    "name": "ancestry",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vexoj2eu",
        "name": "movement",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("iz7n4slz8ubtjhu");

  return dao.deleteCollection(collection);
})
