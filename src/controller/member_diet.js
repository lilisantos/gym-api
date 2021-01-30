//Require model member_diet
const member_diet = require('../model/member_diet.js')();

module.exports = () => {

    //Get member_diet
    const getController = async (req, res) => {
        const {member_dietList, error} = await member_diet.get();
        if(error){
            console.log("=== get:: member_diet Error");
            return res.status(500).json(error);
        }
        
        res.json(member_dietList);
    }

    //Get diet by id
    const getById = async (req, res) => {
        const {member_diet, error} = await member_diet.get(req.params.id);
        if(error){
            console.log("=== getById:: member_diet Error");
            return res.status(500).json(error);
        }
        res.json(member_diet);
    }

    //Add new member diet
    const postController = async (req, res) => {   
        const {member_id, dci, protein, carbs, fat, personal_id} = req.body;

        //Get current date
        var date = new Date();  

        const {results, error} = await member_diet.add(member_id, date, dci, protein, carbs, fat, personal_id);
        if(error){       
            console.log("=== post:: member_diet Error", error);    
            return res.status(500).json(error);
        }

        res.json(results);
    }

    //Update member_diet
    const update = async (req, res) => {
        const {dci, protein, carbs, fat} = req.body;

        const memberId = req.params.member_id;

        console.log("member id controller:" + memberId);

        //Calls the add method on the diet model
        const {result, error} = await member_diet.update(memberId, dci, protein, carbs, fat);
        if(error){
            console.log("=== update:: Member_diet Error", error);
            return res.status(500).json(error);
        }
        res.json(result);
    };

   
    return {
        getController,
        postController,
        getById,
        update,
        // populatedController,
    };
}