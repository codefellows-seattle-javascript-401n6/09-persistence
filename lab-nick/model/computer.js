const uuidv4 = require('uuid/v4');

class Computer {
  constructor(cpu, ram, hdd) {
    this.id = uuidv4();
    this.cpu = cpu;
    this.ram = ram;
    this.hdd = hdd;
  }
}

module.exports = Computer;