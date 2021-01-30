const jwt = require('jsonwebtoken');
const token = require('./token');

module.exports = (req, res, next) => {
  try {
    //Get token
    let accessToken = req.header.jwt;

    //If no token was retrieved, access is denied
    if (!accessToken) {
      error = 'Invalid token!';
      return res.status(403).json({ error: error });
    }
    
    //Verify if token is valid
    const RANDOM_TOKEN = token.RANDOM_TOKEN;
    const decodedToken = jwt.verify(accessToken, RANDOM_TOKEN);

    next();
  } catch (error) {
    error = 'Invalid request!';
    return res.status(401).json({ error: error });
  }
};