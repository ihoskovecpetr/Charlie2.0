const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    console.log("1 I do not ahve authHeader");
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token == "") {
    console.log("2 I do not have token here");
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkeyEvenMore");
  } catch (err) {
    console.log("3 there is not easily verificable token");
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    console.log("4 I do not have decoded token");
    req.isAuth = false;
    return next();
  }

  console.log("AUTH CHECK DONE $$--$$");

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
