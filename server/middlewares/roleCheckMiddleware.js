const roleChecker = (...roles) => {
  return (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        return next();
      }

      return res
        .status(400)
        .send({ error: "you are not allowed for this request..!" });
    } catch (error) {
      res.status(500).send({ error: "500 : internal server error..!" });
      console.log(`roleChecker: from middlewares ${error.message}`);
    }
  };
};

module.exports = { roleChecker };
