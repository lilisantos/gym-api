const db = require('../../db')();
const COLLECTION = 'users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = () => {
  //Get user
  const get = async (email) => {
    try {
      if (email == null) {
        const user = await db.get(COLLECTION);
        return { user };
      }
      const user = await db.get(COLLECTION, { email });
      return { user };
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  //Add user
  const add = async (name, type, email, password) => {
    if (!name || !type || !email || !password) {
      return { error: 'Please, provide all required fields' };
    }

    try {
     
      const key = bcrypt.hashSync(password, salt);
      const results = await db.add(COLLECTION, {
        name,
        type,
        email,
        password: key,
      });

      return { results };
    } catch (err) {
      return { error: err };
    }
  };

  return {
    get,
    add,
  };
};