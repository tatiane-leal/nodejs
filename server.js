const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.get('^/$|/index(.html)?', (req, res) => {
    // We can serve a file in both ways:
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    // 302 is set by default but 302 will not necessarily get the search engine to change. So what we want is a 301.
    // res.redirect('/new-page.html'); 

    // 301 states that this has been permanently moved to a new page, no more old page.
    res.redirect(301, '/new-page.html');
});

// Route handlers (These route handlers work in a way that is very similar to Middleware)
app.get('/hello(.html)?', (req, res, next) => {
    console.log("attemped to load hello.html");
    next(); //next triggers the next request in the chain
}, (req, res) => {
    res.send("Hello World!");
});

// Another way of functions chain together (probably seen more often)
const one = (req, res, next) => {
    console.log("one");
    next();
}

const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res) => {
    console.log("three");
    res.send("Finished!");
}

app.get('/chain(.html)?', [one, two, three]);





// A slash followed by anything will get to this endpoint that will server the 404 page.
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`, '- Click here: http://localhost:' + PORT);
});
