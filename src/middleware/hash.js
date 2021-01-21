const bcrypt = require('bcrypt');

module.exports = () => {
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