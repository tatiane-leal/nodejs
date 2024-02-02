// NPM Modules
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

// Common Core Modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')};`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (error) {
        console.log(error);
    }
}

module.exports = logEvents;


console.log(format(new Date(), 'dd/MM/yyyy'));

console.log(uuid());