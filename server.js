require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { verifyJWT } = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConn");
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDb();

// Custom Middleware - Logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// 3rd Party Middleware, eg: CORS (Cross-Origin Resource Sharing)
app.use(cors(corsOptions));

// 1 - Built-in Middleware to handle urlencoded data (form data) 'content-type: application/x-www-form-urlencoded'
// so we can get this data here
// app.use is what we often use to apply middleware to all routes that are coming in. And just like http methods (app.get, app.post, app.put...) it works as a wattefall,
// so if we put app.use above our route, then this will apply to all requests that come in.
app.use(express.urlencoded({ extended: false }));

// Built-in Middleware for JSON so we can get this data as well. And these middlewares will be applied to all routes that are coming in.
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
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

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully");
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`,
      "- Click here: http://localhost:" + PORT
    );
  });
});
