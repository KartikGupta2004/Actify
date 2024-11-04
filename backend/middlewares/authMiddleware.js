import JWT from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const t = req.headers["authorization"];

    if (!t) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        // console.log('hello',req.body)
        req.body.userId = decode.id;
        // console.log(req.body)
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

export { authMiddleware };
