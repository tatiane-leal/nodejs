const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "User and password are required." });
  }

  const foundUser = usersDB.users.find((u) => u.username === user);

  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // evaluate password

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // Create JWT token to send to use with the other routes that we want protected in our API
    // (normal token / refresh token)
    res.json({ success: `User ${user} logged in!` });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = {
  handleLogin,
};
