const jwt = require("jsonwebtoken");
const authenticate = async (req, res, next) => {
  try {
    const userToken = req.cookies.userJWT;
    const adminJWT = req.cookies.adminJWT;

    if (!userToken) {
      res.status(401).send("No User Token");
    } else {
      const verifyToken = jwt.verify(userToken, process.env.SECRET_KEY);
      if (verifyToken._id) {
        console.log("au");
        res.status(200).send("authorized user");
      }
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticate;
