# S.T.R.I.P.E
*AUTHORS: RAFAEL MALAVE, FRED RAPP,	RONNIE LEWIS*


S.T.R.I.P.E. (Ships, Terminal Ready, Intelligent Process Environment) is an interface that allows a fleet commander to view and update the status of the ships in their fleet. 


## GETTING STARTED

Clone this repository to your local computer. Run `npm install` to install the necessary packages. Start the server with npm start and start mongodb on your local machine with `mongod`. run the tests by running `npm test`.

To manually send requests, use [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/).

## HTTP METHODS

**SHIPS** 
   
- GET endpoints `/api/ships` and `/api/ship/:_id`

Example response body:
```
[
    {
        "crew": [
            {
                "_id": "5ad15f6558205100147bb91b",
                "name": "Jane Dillinger",
                "title": "officer",
                "ship": "5ad15d8258205100147bb918",
                "__v": 0
            },
            {
                "_id": "5ad15f9058205100147bb91d",
                "name": "Robert Doe",
                "title": "enlisted",
                "ship": "5ad15d8258205100147bb918",
                "__v": 0
            }
        ],
        "engine": [
            {
                "_id": "5ad162b658205100147bb927",
                "ftl": true,
                "stl": true,
                "ship": "5ad15d8258205100147bb918",
                "__v": 0
            }
        ],
        "supply": [
            {
                "_id": "5ad1620c58205100147bb925",
                "ammunition": 90,
                "fuel": 87,
                "food": 99,
                "ship": "5ad15d8258205100147bb918",
                "__v": 0
            }
        ],
        "power": [
            {
                "_id": "5ad168a99166a60014269767",
                "battery": 87,
                "engineLevel": 99,
                "ship": "5ad15d8258205100147bb918",
                "__v": 0
            }
        ],
        "_id": "5ad15d8258205100147bb918",
        "name": "Valhala",
        "__v": 0
    }
]
```


- POST endpoint `/api/ships` Suppoerted fields: `name` (string, required) 

Example response body:
```
{
    "crew": [],
    "engine": [],
    "supply": [],
    "power": [],
    "_id": "5ad16bdbf81a4e00145d14e2",
    "name": "Ajax",
    "__v": 0
}
```

- PUT `/api/ships/:_id` send a valid json object with the data to be updated for the selected brand

Example response body:
```
{
    "success": true,
    "data": {
        "crew": [
            "5ad15f6558205100147bb91b",
            "5ad15f7658205100147bb91c",
            "5ad15f9058205100147bb91d"
        ],
        "engine": [
            "5ad162b658205100147bb927",
            "5ad166b6081772001416c201"
        ],
        "supply": [
            "5ad1620c58205100147bb925"
        ],
        "power": [
            "5ad168a99166a60014269767"
        ],
        "_id": "5ad15d8258205100147bb918",
        "name": "Edited Name!",
        "__v": 0
    }
}
```
- DELTE `/api/ship/:_id` delete the required record from the database.

Example response body:

```
{
    "success": true,
    "message": "Ship successfuly deleted."
}
```

**CREW**

- GET endpoints `/api/crew` and `/api/crew/:_id`

Example response body:
```
[
    {
        "_id": "5ad15f6558205100147bb91b",
        "name": "Jane Dillinger",
        "title": "officer",
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    },
    {
        "_id": "5ad15f7658205100147bb91c",
        "name": "Bob Parker",
        "title": "officer",
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    },
    {
        "_id": "5ad15f9058205100147bb91d",
        "name": "Robert Doe",
        "title": "enlisted",
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    }
]
```

- POST endpoint `/api/crew` Suppoerted fields: `name` (string, required) 

Example response body:
```
{
    "_id": "5ad16f75f81a4e00145d14e3",
    "name": "Ronnie Lewis",
    "title": "officer",
    "ship": "5ad15d9458205100147bb919",
    "__v": 0
}
```

-PUT `/api/crew/:_id` send a valid json object with the data to be updated for the selected brand

Example response body:

```
{
    "success": true,
    "data": {
        "_id": "5ad16f75f81a4e00145d14e3",
        "name": "Ronnie Lewis",
        "title": "enlisted",
        "ship": "5ad15d9458205100147bb919",
        "__v": 0
    }
}
```

- DELTE `/api/crew/:_id` delete the required record from the database.

Example response body:

```
{
    "success": true,
    "message": "Successfully deleted crew member"
}
```

**ENGIINE** 

- GET endpoints `/api/engine` and `/api/engine/:_id`

Example response body:
```
[
    {
        "_id": "5ad1609f58205100147bb923",
        "ftl": true,
        "stl": true,
        "ship": "5ad15dad58205100147bb91a",
        "__v": 0
    },
    {
        "_id": "5ad162b658205100147bb927",
        "ftl": true,
        "stl": true,
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    },
    {
        "_id": "5ad162ec58205100147bb928",
        "ftl": true,
        "stl": true,
        "ship": "5ad15d9458205100147bb919",
        "__v": 0
    }
]
```

- POST endpoint `/api/engine` Suppoerted fields: `name` (string, required) 

Example response body:
```
{
    "_id": "5ad17249f81a4e00145d14e4",
    "ftl": true,
    "stl": true,
    "ship": "5ad15d9458205100147bb919",
    "__v": 0
}
```

-PUT `/api/engine/:_id` send a valid json object with the data to be updated for the selected brand

Example response body:

```
{
    "succes": true,
    "data": {
        "_id": "5ad17249f81a4e00145d14e4",
        "ftl": false,
        "stl": true,
        "ship": "5ad15d9458205100147bb919",
        "__v": 0
    }
}
```

- DELTE `/api/engine/:_id` delete the required record from the database.

Example response body:

```
{
    "success": true,
    "message": "Successfully deleted engine member"
}
```

**SUPPLY**

- GET endpoints `/api/supply` and `/api/supply/:_id`

Example response body:
```
[
    {
        "_id": "5ad161c958205100147bb924",
        "ammunition": 90,
        "fuel": 87,
        "food": 99,
        "ship": "5ad15dad58205100147bb91a",
        "__v": 0
    },
    {
        "_id": "5ad1620c58205100147bb925",
        "ammunition": 90,
        "fuel": 87,
        "food": 99,
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    },
    {
        "_id": "5ad1635958205100147bb929",
        "ammunition": 90,
        "fuel": 87,
        "food": 99,
        "ship": "5ad15d9458205100147bb919",
        "__v": 0
    }
]

```

- POST endpoint `/api/supply` Suppoerted fields: `name` (string, required) 

Example response body:
```
{
    "_id": "5ad175bdf81a4e00145d14e5",
    "ammunition": 90,
    "fuel": 87,
    "food": 99,
    "ship": "5ad15dad58205100147bb91a",
    "__v": 0
}
```

-PUT `/api/supply/:_id` send a valid json object with the data to be updated for the selected brand

Example response body:

```
{
    "success": true,
    "data": {
        "_id": "5ad175bdf81a4e00145d14e5",
        "ammunition": 78,
        "fuel": 82,
        "food": 65,
        "ship": "5ad15dad58205100147bb91a",
        "__v": 0
    }
}
```

- DELTE `/api/supply/:_id` delete the required record from the database.

Example response body:

```
{
    "success": true,
    "message": "Successfully deleted supply"
}
```

**POWER**

- GET endpoints `/api/power` and `/api/power/:_id`

Example response body:
```
[
    {
        "_id": "5ad16695081772001416c1ff",
        "battery": 87,
        "engineLevel": 99,
        "ship": "5ad15d9458205100147bb919",
        "__v": 0
    },
    {
        "_id": "5ad1669b081772001416c200",
        "battery": 87,
        "engineLevel": 99,
        "ship": "5ad15dad58205100147bb91a",
        "__v": 0
    },
    {
        "_id": "5ad166b6081772001416c201",
        "battery": 87,
        "engineLevel": 99,
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    },
    {
        "_id": "5ad168a99166a60014269767",
        "battery": 87,
        "engineLevel": 99,
        "ship": "5ad15d8258205100147bb918",
        "__v": 0
    },
    {
        "_id": "5ad16a28f81a4e00145d14df",
        "battery": 87,
        "engineLevel": 99,
        "ship": "5ad15d9458205100147bb919",
        "__v": 0
    },
    {
        "_id": "5ad16a44f81a4e00145d14e0",
        "battery": 87,
        "engineLevel": 99,
        "ship": "5ad15dad58205100147bb91a",
        "__v": 0
    }
]

```

- POST endpoint `/api/power` Suppoerted fields: `name` (string, required) 

Example response body:

```
{
    "_id": "5ad17733f81a4e00145d14e7",
    "battery": 100,
    "engineLevel": 95,
    "ship": "5ad15dad58205100147bb91a",
    "__v": 0
}
```

-PUT `/api/power/:_id` send a valid json object with the data to be updated for the selected brand

Example response body:

```
{
    "success": true,
    "message": "Successfuly updated power"
}
```

- DELTE `/api/power/:_id` delete the required record from the database.

Example response body:

```
{
    "success": true,
    "message": "Successfully deleted power"
}
```

**ERRORS**

```
{
    "errors": {
        "password": {
            "message": "Path `password` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `{PATH}` is required.",
                "type": "required",
                "path": "password"
            },
            "kind": "required",
            "path": "password",
            "$isValidatorError": true
        },
        "username": {
            "message": "Path `username` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `{PATH}` is required.",
                "type": "required",
                "path": "username"
            },
            "kind": "required",
            "path": "username",
            "$isValidatorError": true
        }
    },
    "_message": "User validation failed",
    "message": "User validation failed: password: Path `password` is required., username: Path `username` is required.",
    "name": "ValidationError"
}

```

## TECHNOLOGIES

- Nodejs
- Express
- npm
- MongoDB
- Heroku