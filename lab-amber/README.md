# Amber Kim CodeFellows Lab 09 Persistence with File System

## Introduction
This is a simple node.js app with an Http Server that implements Restful API's. It is built using Vanilla JavaScript and practices separation of concerns. Some peristence is created using NPM File Server.

## To Run This Application
Run server.js. Some example tools and commands you can use:
```
node server.js
// for node

nodemon server.js
// if you have nodemon installed globally

npm run start
// the package.json in this repo is configured to run "nodemon server.js" with this command.
```

RECOMMENDED: Test this app by using an http client like Postman.

### For Getting all the Projects:
```
http://localhost:3000/api/projects
```

### For getting a specific Project:
```
http://localhost:3000/api/projects?id=<project id>
```

Improper GET request will return 404 not found


### For POST requests, use:
```
http://localhost:3000/api/projects
```
and send proper JSON in the request body
```
{
	"id": "a432bd37-849b-42e3-9e14-814ee4055b81",
    "name": "Woohoo!",
    "description": "The Arithmetic.add method expects two integers as parameters and returns either null if the entered arguments are invalid or an integer as the sum of both numbers.",
    "link": "https://github.com/amgranad/01-node-ecosystem/tree/master/lab-amber"
}
```

Proper POST requests will return JSON
Improper POST requests will return 400 bad request.

### For PUT requests, use
```
http://localhost:3000/api/projects
```
and send proper JSON in the request body:
```
{
	  "id": "<existing project id>",
    "name": "Woohoo!",
    "description": "The Arithmetic.add method expects two integers as parameters and returns either null if the entered arguments are invalid or an integer as the sum of both numbers.",
    "link": "https://github.com/amgranad/01-node-ecosystem/tree/master/lab-amber"
}
```
