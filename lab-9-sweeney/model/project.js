'use strict';

const uuid = require('uuid/v4');

class Project {
  constructor(name, description, link) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.link = link;
  }
}

module.exports = Project;