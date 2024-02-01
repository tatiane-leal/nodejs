const fsPromises = require('fs').promises;
const path = require('path');

// Using async await instead of callbacks (fs uses callbacks / fsPromises uses promises so its asynchronous)
// Here we are reading the file, logging the data to the console and then deleting the file, then creating a new file
const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname,'starter.txt'), 'utf-8');
        console.log(data);

        // Delete file
        await fsPromises.unlink(path.join(__dirname, 'starter.txt'));

        await fsPromises.writeFile(path.join(__dirname, 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'promiseWrite.txt'), '\n\nNice to meet you, Tatiane!');
        await fsPromises.rename(path.join(__dirname, 'promiseWrite.txt'), path.join(__dirname, 'promiseComplete.txt'));

        const newData = await fsPromises.readFile(path.join(__dirname,'promiseComplete.txt'), 'utf-8');
        console.log(newData);
    } catch (err) {
        console.error(err);
    }
};

fileOps();

// fs.readFile(path.join(__dirname, 'starter.txt'), 'utf-8', (err, data) => {  
//     if (err) throw err;
//     console.log(data);
// });

// This works but turns into a callback hell
// fs.writeFile(path.join(__dirname, 'reply.txt'), 'It is really nice to meet you!', (err) => {  
//     if (err) throw err;
//     console.log("Write Operation completed successfully");

//     fs.appendFile(path.join(__dirname, 'reply.txt'), '\n\nYes it is! Testing appending text here', (err) => {  
//         if (err) throw err;
//         console.log("Append Operation completed successfully");

//         fs.rename(path.join(__dirname, 'reply.txt'), path.join(__dirname, 'newReply.txt'), (err) => {  
//             if (err) throw err;
//             console.log("Rename Operation completed successfully");
//         });

//     });
// });



// We thrown the error, but if we get this uncaught exception we need to catch it

// exit on uncaught errors
// process is one of those values that node has available to us so we don't need to import it
process.on('uncaughtException', (err) => {
    console.log(`There was an uncaught error ${err}`);
    process.exit(1);
});