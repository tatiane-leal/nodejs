const fs = require('fs');
const path = require('path');

// If the folder does not exist, create it. Notice that if the folder does not exist the console log will show up saying Folder created
if(!fs.existsSync(path.join(__dirname, 'myNewFolder'))) {
    fs.mkdir(path.join(__dirname, 'myNewFolder'), (err)  => {
        if (err) throw err;
        console.log('Folder created');
    });
}

// Delete folder if it does exist
if(fs.existsSync(path.join(__dirname, 'myNewFolder'))) {
    fs.rmdir(path.join(__dirname, 'myNewFolder'), (err)  => {
        if (err) throw err;
        console.log('Folder deleted');
    });
}


