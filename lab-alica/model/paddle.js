'use strict';

const uuidv4 = require('uuid/v4');

class Paddle {
    constructor(name, bladeSurfaceArea, length) {
        this.id = uuidv4();
        this.name = name;
        this.bladeSurfaceArea = bladeSurfaceArea;
        this.length = length;
    }
}

module.exports = Paddle;