const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("req:",req.headers)
    const token = req.headers.authorization.split(" ")[1];
    const verified_token = jwt.verify(token, "A_very_long_string_for_our_secret");
    console.log("VERIFIED",verified_token)
    if(verified_token){
        
        next();
    }

  } catch (error) {
    res.status(401).json({ message: "Auth Failed" });
  }
};

module.exports = { auth };
