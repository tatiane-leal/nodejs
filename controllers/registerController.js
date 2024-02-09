const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, pwd } = req.body;
  console.log("user, pwd? ", username, pwd);

  if (!username || !pwd) {
    return res.status(400).json({ message: "User and password are required." });
  }

  // Check if user already exists
  const duplicate = await User.findOne({ "username": username }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // Encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Cretae and Store the new user
    const result = await User.create({ 
      "username": username,
      "password": hashedPwd
     });

     console.log(result);

    res.status(201).json({"success": `New user ${username} created!`});

  } catch (err) {
    res.status(500).json({ "message": err.message });
  }
};

module.exports = {
    handleNewUser
};
