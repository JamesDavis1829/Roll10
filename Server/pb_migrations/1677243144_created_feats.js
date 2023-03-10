migrate((db) => {
  const collection = new Collection({
    "id": "1luk9k6t6guzi5g",
    "created": "2023-02-24 12:52:24.545Z",
    "updated": "2023-02-24 12:52:24.545Z",
    "name": "feats",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xsktzkql",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "enz2tot4",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hikdhbo9",
        "name": "tier",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 10
        }
      },
      {
        "system": false,
        "id": "6rx1hmaq",
        "name": "prerequisites",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 512,
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
  const collection = dao.findCollectionByNameOrId("1luk9k6t6guzi5g");

  return dao.deleteCollection(collection);
})
