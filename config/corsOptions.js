// After development is done, remove || !origin and local domains from white list.
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    // If the origin domain is in the white list, then allow the request
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // null means no error and true means the origin is allowed
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
