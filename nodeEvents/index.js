// Our custom module
const logEvents = require('./logEvents');

// Common Core Modules
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// Initialize the object 
const myEmitter = new MyEmitter();

// Add listener for the log event
myEmitter.on('log', (message) => logEvents(message));

setTimeout(() => {
    myEmitter.emit('log', 'Log Event Emitted - Hello World!');
}, 2000);