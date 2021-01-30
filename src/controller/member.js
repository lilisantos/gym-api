//Require model member
const members = require('../model/member.js')();

module.exports = () => {

    //Get members
    const getController = async (req, res) => {
        const {memberList, error} = await members.get();
        if(error){
            console.log("=== get:: Member Error");
            return res.status(500).json(error);
        }
        
        res.json(memberList);
    }

    //Get members by id
    const getById = async (req, res) => {
        const {member, error} = await members.get(req.params.id);
        if(error){
            console.log("=== getById:: Member Error");
            return res.status(500).json(error);
        }
        res.json(member);
    }

    //Get members by email
    const getByEmail = async (req, res) => {
        const {email} = req.body;

        const {member, error} = await members.get(email);
        if(error){
            return res.status(500).json({error});
        }
        res.json(member);
    }

    //Add new member
    const postController = async (req, res) => {   
        const {name, email, date_birth, goal_weight, personal_id} = req.body;

        var dateFormat = require("dateformat");
        //Format date of birth
        dob = dateFormat(date_birth, "dd-mm-yyyy");

        const {results, error} = await members.add(name, email, dob, goal_weight, personal_id);
        if(error){       
            console.log("=== post:: Member Error", error);    
            return res.status(500).json(error);
        }

        res.json(results);
    }
   
    return {
        getController,
        postController,
        getById,
        getByEmail
    };
}