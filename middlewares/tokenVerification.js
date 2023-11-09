import jwt from "jsonwebtoken";

export const tokenVerification = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    res.status(403).send(`Access denied`);
    return;
  }
  if (token.startsWith(`Bearer `)) {
    token = token.slice(8);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`erreur lors de decodage :`, err.message);
      res.send({ message: "invalid token" });
      return;
    }
    req.user = decoded;
    next();
  });
};
