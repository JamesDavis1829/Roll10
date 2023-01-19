migrate((db) => {
  const collection = new Collection({
    "id": "5fzey1g4upf9lw2",
    "created": "2023-01-18 03:20:45.224Z",
    "updated": "2023-01-18 03:20:45.224Z",
    "name": "actions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bn10kze7",
        "name": "action_effect",
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
        "id": "36pr8tgy",
        "name": "dice_roll",
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
        "id": "gjwl0ymd",
        "name": "modifiers",
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
        "id": "rwypzvvb",
        "name": "action_type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "combat",
            "roleplay"
          ]
        }
      },
      {
        "system": false,
        "id": "4k6jpkuy",
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
        "id": "0wbahfvc",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 1000,
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
  const collection = dao.findCollectionByNameOrId("5fzey1g4upf9lw2");

  return dao.deleteCollection(collection);
})
