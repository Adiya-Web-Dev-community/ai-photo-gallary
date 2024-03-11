const jwt = require("jsonwebtoken");
require("dotenv").config();

const accountMiddleware = (req, resp, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {


      const { _id } = jwt.verify(token, process.env.SECRET_KEY);

      if (_id) {

        req.accountId = _id;
        next();
      }
    } else {
      resp
        .status(401)
        .json({ success: false, msg: "token expired, access denied" });
    }
  } catch (err) {
    resp.status(500).json({ success: false, msg: err });
  }
};

module.exports = accountMiddleware;
