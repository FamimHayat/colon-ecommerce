const { verifyToken } = require("../tokens/tokens");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token)
      return res.status(400).send({ error: "unauthorized request..!" });

    const decoded = verifyToken(token.ACCESS_TOKEN);

    if (!decoded)
      return res.status(400).send({ error: "unauthorized request" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(`authMiddleware : from middlewares ${error.message} `);
  }
};

module.exports = authMiddleware;
