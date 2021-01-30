//Require model slots
const users = require('../model/users')();

module.exports = () => {

  //Get all users
  const getAll = async (req, res) => {
    const { user, error } = await users.get();
    if (error) {
      res.status(500).send({ error });
    }
    res.send(user);
  };

  //Get individual user
  const getOne = async (req, res) => {
    const { user, error } = await users.get(req.params.email);
    if (error) {
      res.status(500).send({ error });
    }
    res.send(user);
  };

  //Add user
  const addOne = async (req, res) => {
    const { name, email, type, password } = req.body;

    const { results, error } = await users.add(name, type, email, password);
    if (error) {
      res.status(500).send({
        error,
      });
    }
    res.send(results);
  };
  
  return {
    getAll,
    getOne,
    addOne,
  };
};