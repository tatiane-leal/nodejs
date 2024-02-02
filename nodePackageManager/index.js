const { format } = require('date-fns');

const { v4: uuid} = require('uuid');

console.log(format(new Date(), 'dd/MM/yyyy'));

console.log(uuid());

console.log("");