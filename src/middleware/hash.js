const bcrypt = require('bcrypt');

module.exports = () => {
  
  //Compares credentials entered with the ones registered on the database

  const compare = async (key, hashKey) => {
    let isEqual = null;
    await bcrypt.compare(key, hashKey).then((result) => {
      isEqual = result;
    });
    return isEqual;
  };
  
  return {
    compare,
  };
};