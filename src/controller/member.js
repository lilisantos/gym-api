const db = require('../../db.js');

const member = require('../model/member.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {memberList, error} = await member.get();
        if(error){
            console.log("=== get:: Member Error");
            return res.status(500).json(error);
        }
        
        res.json(memberList);
    }

    const getById = async (req, res) => {
        const {member, error} = await member.get(req.params.id);
        if(error){
            console.log("=== getById:: Member Error");
            return res.status(500).json(error);
        }
        res.json(member);
    }

    const postController = async (req, res) => {   
        const {name, email, date_birth, goal_weight, personal_id} = req.body;

        var dateFormat = require("dateformat");
        // var date = new Date();  
        
        dob = dateFormat(date_birth, "dd:mm:yyyy");
        console.log("dob = " + dob);

        const {results, error} = await member.add(name, email, dob, goal_weight, personal_id);
        if(error){       
            console.log("=== post:: Member Error", error);    
            return res.status(500).json(error);
        }

        res.json(results);
    }

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
        // populatedController,
    };
}