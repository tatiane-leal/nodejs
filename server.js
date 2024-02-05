const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

// Custom Middleware - Logger
app.use(logger);

// 3rd Party Middleware, eg: CORS (Cross-Origin Resource Sharing)
app.use(cors(corsOptions));

// 1 - Built-in Middleware to handle urlencoded data (form data) 'content-type: application/x-www-form-urlencoded'
// so we can get this data here
// app.use is what we often use to apply middleware to all routes that are coming in. And just like http methods (app.get, app.post, app.put...) it works as a wattefall,
// so if we put app.use above our route, then this will apply to all requests that come in.
app.use(express.urlencoded({ extended: false }));

// Built-in Middleware for JSON so we can get this data as well. And these middlewares will be applied to all routes that are coming in.
app.use(express.json());

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/root"));
// This will route any request that comes in for the subdirectory to router instead of the routes below with app.method()
app.use("/employees", require("./routes/api/employees"));

// A slash followed by anything will get to this endpoint that will serve the 404 page.
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// But for 404 (wildcard) we can actually use the following:
// So as this is at the end of the page, after all possible routes, anything that made it here should get the 404 page.
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`,
    "- Click here: http://localhost:" + PORT
  );
});
