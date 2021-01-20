const db = require('../../db.js');

const member_diet = require('../model/member_diet.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {member_dietList, error} = await member_diet.get();
        if(error){
            console.log("=== get:: member_diet Error");
            return res.status(500).json(error);
        }
        
        res.json(member_dietList);
    }

    const getById = async (req, res) => {
        const {member_diet, error} = await member_diet.get(req.params.id);
        if(error){
            console.log("=== getById:: member_diet Error");
            return res.status(500).json(error);
        }
        res.json(member_diet);
    }

    const postController = async (req, res) => {   
        const {member_id, dci, protein, carbs, fat, personal_id} = req.body;

        var dateFormat = require("dateformat");
        var date = new Date();  
        
        // date = dateFormat(date_update, "dd:mm:yyyy");

        const {results, error} = await member_diet.add(member_id, date, dci, protein, carbs, fat, personal_id);
        if(error){       
            console.log("=== post:: member_diet Error", error);    
            return res.status(500).json(error);
        }

        res.json(results);
    }

    const update = async (req, res) => {
        const {dci, protein, carbs, fat} = req.body;

        const memberId = req.params.member_id;

        console.log("member id controller:" + memberId);

        //Calls the add method on the issues model
        const {result, error} = await member_diet.update(memberId, dci, protein, carbs, fat);
        if(error){
            console.log("=== update:: Member_diet Error", error);
            return res.status(500).json(error);
        }
        res.json(result);
    };

    // const populatedController = async (req, res) => {
    //     const {projectIssues, error} = await projects.aggregateWithIssues(req.params.slug);
    //     if(error){
    //         console.log("=== aggregate:: Projects Error");
    //         return res.status(500).json(error);
    //     }
    //     res.json(projectIssues);
    // };

  
   
    return {
        getController,
        postController,
        getById,
        update,
        // populatedController,
    };
}