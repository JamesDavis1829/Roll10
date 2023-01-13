migrate((db) => {
  const collection = new Collection({
    "id": "fynsff5xclwd2av",
    "created": "2023-01-11 22:57:19.806Z",
    "updated": "2023-01-11 22:57:19.806Z",
    "name": "class",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r4ujvzaq",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 250,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
  const collection = dao.findCollectionByNameOrId("fynsff5xclwd2av");

  return dao.deleteCollection(collection);
})
