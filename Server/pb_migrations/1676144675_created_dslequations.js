migrate((db) => {
  const collection = new Collection({
    "id": "na9v1vc7838apuy",
    "created": "2023-02-11 19:44:35.781Z",
    "updated": "2023-02-11 19:44:35.781Z",
    "name": "dslequations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mlnlebkj",
        "name": "equation",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 500,
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
  const collection = dao.findCollectionByNameOrId("na9v1vc7838apuy");

  return dao.deleteCollection(collection);
})
