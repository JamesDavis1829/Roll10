migrate((db) => {
  const collection = new Collection({
    "id": "frv1i8qnsg8njjp",
    "created": "2023-01-21 17:47:34.301Z",
    "updated": "2023-01-21 17:47:34.301Z",
    "name": "dicerooms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kpnirrck",
        "name": "room_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "d6m9yls6",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "utavgkow",
        "name": "diceroll",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "sridvily",
        "name": "rolledamount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 10000
        }
      },
      {
        "system": false,
        "id": "mfot0tyv",
        "name": "timstamp",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("frv1i8qnsg8njjp");

  return dao.deleteCollection(collection);
})
