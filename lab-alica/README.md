# Vanilla REST API with Persistence

## Author: Alicia Lycan

### Introduction:
Setup a simple REST API to learn how save resource data to the file system for a layer of data persistence and how to refactor commonly used coding constructs into custom helper modules.

### Installation:

- Clone the repository to your local server
- Install the dependencies

### Connecting:

Run server.js. Some tools you can use to do this include:
```
node server.js
// for node

nodemon server.js
// for nodemon you must have the package installed globally
```
### Testing:

To test this app it is recommended you use an http client such as Postman or install the httpie npm package globally.

If you are using HTTPie, in your terminal window, type the following commands, where '3000' would be replaced with your local environment PORT variable, if configured. Commands can only be sent to the api endpoint.

Proper GET requests will return JSON while improper GET requests will return a 404 not found response.
Proper POST requests will return JSON while improper POST requests will return 400 bad request.

```sh

$ http GET localhost:3000/api/paddles
//returns all stored paddle objects

$ http GET localhost:3000/api/paddle?id=sample-id 
// returns the name, blade surface area, and length of a stored paddle object

$ http POST :3000/api/paddle name='test name' bladeSurfaceArea='test blade surface area' length='test length'
// creates a new paddle object on the server, and returns a unique id

$ DELETE localhost:3000/api/paddle?id=sample-id
// deletes the paddle object from server storage
```