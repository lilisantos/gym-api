const jwt = require('jsonwebtoken');
const db = require('../../db')();
const userHashKey = require('./hash')();
const crypto = require('crypto');

exports.login = async (req, res, next) => {
  try {
    let email = req.body.email;

    //Checks if user is valid
    const user = await db.get('users', { email });
    if (!user || user.length == 0) {
      error = 'User not Found!';
      return res.status(404).json({ error: error });
    }

    //Checks if password entered matches the one on the database
    const key = req.body.password;
    const hashedKey = user[0].password;
    const verifyKey = await userHashKey.compare(key, hashedKey);    
    if (!verifyKey) {
      error = 'Incorrect Password!';
      return res.status(401).json({ error: error });
    }

    const RANDOM_TOKEN = crypto.randomBytes(15).toString('HEX');
    //Creates token and sets it to expire in 24h
    const token = jwt.sign({ userId: user[0]._id }, RANDOM_TOKEN, {
      expiresIn: '24h',
    });

    //Return cookie with token
    res.cookie('jwt', token, { secure: false, httpOnly: true });
    res.status(200).json({
      user: user[0].email,
      Information: 'This token below was sent in a cookie named jwt',
      token: token,
    });

    module.exports.RANDOM_TOKEN = RANDOM_TOKEN;
    res.send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};