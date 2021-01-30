//Require model personal
const personal = require('../model/personal.js')();

module.exports = () => {

    //Get personal trainers
    const getController = async (req, res) => {
        const {personalList, error} = await personal.get();
        if(error){
            console.log("=== get:: Personal Error");
            return res.status(500).json(error);
        }
        
        res.json(personalList);
    }

    //Get personal trainers by id
    const getById = async (req, res) => {
        const {personal, error} = await personal.get(req.params.id);
        if(error){
            console.log("=== getById:: Personal Error");
            return res.status(500).json(error);
        }
        res.json(personal);
    }

    //Add new personal trainer
    const postController = async (req, res) => {   
        const {name, email, mobile} = req.body;

        const {results, error} = await personal.add(name, email, mobile);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
    }

    return {
        getController,
        postController,
        getById,
    };
}