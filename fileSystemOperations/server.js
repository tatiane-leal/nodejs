console.log("Hello World!");

// console.log("Global object: ", global);

// Common Core Modules
const os = require('os');
const path = require('path');

// Our Own Custom Modules
const { add, subtract, multiply, divide } = require('./math');

console.log(subtract(3,1));