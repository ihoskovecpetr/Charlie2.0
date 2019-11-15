module.exports = (req, res, next) => {
  const authHeader = req.get("authorization");
  var token = 0;
  console.log("authHeader: ", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
  } else if (token) {
    req.isAuth = true;
    console.log("req.isAuth: ", req.isAuth);
  }
  console.log("Auth PASS");
  next();
};
