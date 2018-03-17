![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Vanilla REST API w/ Persistence
======

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will learn how to save resource data to the file system for a layer of data persistence
* students will learn how to refactor commonly used coding constructs into custom helper modules

## Requirements

#### Configuration
* `package.json`
* `.gitignore`
* `README.md`
  * your `README.md` should include detailed instructions on how to use your API
  * this should include documentation on how to access your API endpoints

#### Feature Tasks
* Continue working on your vanilla REST API
* Refactor your routes to be contained in a separate module (ex: `route/resource-route.js`)
* Refactor your `res` messages & status codes to be contained in a separate module (ex: `response.js`)
* Refactor the `storage.js` module to use file system persistence
  * Use the `fs` module to create and read the associated data files
  * The name of the file should contain the related resource id
