const { verify } = require('jsonwebtoken');

module.exports = {
  authorization: (req, res, next) => {
    const token = req.get('authorization');
    const clientToken = token.slice(7);
    const responseObj = {
      success: false,
      message: null,
      data: null,
    };
    if (clientToken) {
      // Verify Token
      const isTokenValid = verify(
        clientToken,
        process.env.JWT_KEY,
        (err, decodedObj) => {
          if (err) {
            responseObj.message = err;
            res.status(500).json(responseObj);
            return false;
          }
          req.app.set('user', decodedObj);
          return true;
        },
      );
      if (isTokenValid) {
        next();
      } else {
        responseObj.message = 'Invalid Token';
        res.status(200).json(responseObj);
      }
    } else {
      responseObj.message = 'Un-Authorized';
      res.status(200).json(responseObj);
    }
  },
};
