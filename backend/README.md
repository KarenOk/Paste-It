# PasteIt Backend

## Getting Started (Running Locally)

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python).

#### Virtual Environment

Its recommended to work within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual environment for a platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by navigating to the `/backend` directory and running `pip install -r requirements.txt`. This will install all of the required packages we selected within the `requirements.txt` file.

## Setting up the Database

Find steps to install and [get started with PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/) here.

## Running the server

From within the `./backend` directory, first ensure you are working using your created virtual environment. Then, export the required environment variables in your terminal. Run the following commands after updating the values accordingly:

```
export DATABASE_URL='postgresql://postgres:postgres@localhost:5432/database_name'
export FLASK_APP=app.py
export FLASK_ENV=development
```

After setting the above environment variables, run `flask run` to start the server. The server will run on `https://paste-it-api.herokuapp.com`.

The endpoints have been gathered in a [postman](https://www.postman.com/) collection to aid ease of use. To run the endpoints using [Postman](https://www.postman.com/) import the postman collection `./project_name.postman_collection.json`.

## Testing the application

To test the application, a [python test script](./test_app.py) has been provided.

Before running,

-   Ensure your working in a virtual environment and that you're in the `./backend` folder.
-   Run the following commands
    ```
    export DATABASE_URL='postgresql://postgres:postgres@localhost:5432/project_name_test'
    export FLASK_APP=app.py
    export FLASK_ENV=development
    ```

Run the tests with:

```
    dropdb project_name_test
    createdb project_name_test
    python test_app.py
```

## API Reference

**BASE URL**: `https://paste-it-api.herokuapp.com`

### Error Handling

#### Response Object

Errors are returned as JSON in the following format:

```
{
    "error": 404,
    "message": "The requested resource was not found."
}
```

#### Response Keys

`error` - Status code of the error that occurred. <br>
`message` - Accompanying error message.

#### Status Codes

`400 (Bad request)` - Your request was not properly formatted. <br>
`404 (Not found)` - The requested resource was not found. <br>
`405 (Method not allowed)` - The request method is not allowed. <br>
`422 (Unprocessable)` - The server understood your request but it could not be processed. <br>
`500 (Internal server error)` - Something went wrong on the server. <br>

### Endpoint Library

#### Pastes

#### `POST /pastes`

This creates a paste and associates it with a generated key that will be used to uniquely identify it.

##### Query Parameters

This endpoint takes in no query parameters

##### Request Body

`content`: string <small> (required) </small> - Paste content <br>

```
{"content": "This is some paste content."}
```

##### Sample Request

`curl https://paste-it-api.herokuapp.com/paste -X POST -H "{Content-Type: 'application/json'}" -d '{"content": "This is some paste content."}'`

##### Sample Response

`data`: object - Details about created paste. <br>
`success`: boolean - Request success status. <br>

```
{
    "data": {
        "content":" This is some paste content.",
        "created_at":" 2020-11-12 13:49:54.431170",
        "expires_at":" 2020-11-13 13:49:54.431183",
        "key":" abcd"
    },
    "success":true
}
```

#### `GET /pastes/{key}`

This retrieves a particular paste's information using its unique key. It confirms if the paste has not expired before returning it, and deletes it and returns a 404 error if it has.

##### Query Parameters

This endpoint does not take in query parameters.

##### Request Body

This endpoint does not require a request body.

##### Sample Request

`curl https://paste-it-api.herokuapp.com/pastes/abcd`

##### Sample Response

`data`: object - Details about retrieved paste. <br>
`success`: boolean - Request success status. <br>

```
{
    "data": {
        "content":" This is some paste content.",
        "created_at":" 2020-11-12 13:49:54.431170",
        "expires_at":" 2020-11-13 13:49:54.431183",
        "key":" abcd"
    },
    "success":true
}
```

#### `DELETE /pastes/{key}`

This deletes a particular paste's information using its unique key. It returns the key of the deleted paste and a success status.

##### Query Parameters

This endpoint takes in no query parameters.

##### Request Body

This endpoint requires no request body.

##### Sample Request

`curl https://paste-it-api.herokuapp.com/pastes/abcd -X DELETE`

##### Sample Response

`deleted`: string - Key of the deleted paste. <br>
`success`: boolean - Request success status. <br>

```
{
    "deleted": "abcd",
    "success": True
}
```

#### `DELETE /pastes/expired`

This deletes all the pastes that have expired from the database.

##### Query Parameters

This endpoint takes in no query parameters.

##### Request Body

This endpoint requires no request body.

##### Sample Request

`curl https://paste-it-api.herokuapp.com/pastes/expired -X DELETE`

##### Sample Response

`no_of_records`: int - Number of deleted records. <br>
`success`: boolean - Request success status. <br>

```
{
    "no_of_records": 10,
    "success": True
}
```
