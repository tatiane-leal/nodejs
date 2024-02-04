const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

// Custom Middleware - Logger
app.use(logger);


// 3rd Party Middleware, eg: CORS (Cross-Origin Resource Sharing)
// After development is done, remove || !origin and local domains from white list.
const whiteOriginDomainList = ['http://localhost:3000', 'https://www.google.com'];
const corsOptions = {
    origin: (origin, callback) => {
        // If the origin domain is in the white list, then allow the request
        if (whiteOriginDomainList.indexOf(origin) !== -1 || !origin) {
            // null means no error and true means the origin is allowed
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// 1 - Built-in Middleware to handle urlencoded data (form data) 'content-type: application/x-www-form-urlencoded'
// so we can get this data here
// app.use is what we often use to apply middleware to all routes that are coming in. And just like http methods (app.get, app.post, app.put...) it works as a wattefall,
// so if we put app.use above our route, then this will apply to all requests that come in.
app.use(express.urlencoded({ extended: false }));

// Built-in Middleware for JSON so we can get this data as well. And these middlewares will be applied to all routes that are coming in.
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


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

// A slash followed by anything will get to this endpoint that will serve the 404 page.
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// But for 404 (wildcard) we can actually use the following:
// So as this is at the end of the page, after all possible routes, anything that made it here should get the 404 page.
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`, '- Click here: http://localhost:' + PORT);
});
