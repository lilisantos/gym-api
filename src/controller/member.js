const db = require('../../db.js');

const members = require('../model/member.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {memberList, error} = await members.get();
        if(error){
            console.log("=== get:: Member Error");
            return res.status(500).json(error);
        }
        
        res.json(memberList);
    }

    const getById = async (req, res) => {
        const {member, error} = await members.get(req.params.id);
        if(error){
            console.log("=== getById:: Member Error");
            return res.status(500).json(error);
        }
        res.json(member);
    }

    const getByEmail = async (req, res) => {
        const {email} = req.body;

        const {member, error} = await members.get(email);
        if(error){
            return res.status(500).json({error});
        }

        console.log("member: " + member);
        res.json(member);
    }

    const postController = async (req, res) => {   
        const {name, email, date_birth, goal_weight, personal_id} = req.body;

        var dateFormat = require("dateformat");
        // var date = new Date();  
        
        dob = dateFormat(date_birth, "dd:mm:yyyy");
        console.log("dob = " + dob);

        const {results, error} = await members.add(name, email, dob, goal_weight, personal_id);
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
        getByEmail
        // populatedController,
    };
}