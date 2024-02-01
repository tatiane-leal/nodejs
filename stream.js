// More efficient way to read a file

const path = require('path');
const fs = require('fs');

// Corrected path.join and separate encoding argument
const rs = fs.createReadStream(path.join(__dirname, 'lorem.txt'), { encoding: 'utf8' });

const ws = fs.createWriteStream(path.join(__dirname, 'new-lorem.txt'));

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// });

// Better way to do it instead of a listener:

rs.pipe(ws); // will do the same thing but pipe is more efficient
