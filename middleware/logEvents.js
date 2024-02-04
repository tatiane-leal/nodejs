// NPM Modules
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

// Common Core Modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')};`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    // Go one directory up with two dots after dirname.
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(req.method, req.url);
    next();
}

module.exports = { logger, logEvents };