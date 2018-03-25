'use strict';

class Dog {
  constructor(name, age, breed) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  };
  // describe(){
  //   const dogInfo = `Name= ${this.name}, Age= ${this.age}, Breed= ${this.breed}`;
  //   console.log(`Dog Info: ${dogInfo}`);
  // };
};

module.exports = Dog;