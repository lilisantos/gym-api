const db = require('../../db.js');

const member_progress = require('../model/member_progress.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {member_progressList, error} = await member_progress.get();
        if(error){
            console.log("=== get:: member_progress Error");
            return res.status(500).json(error);
        }
        
        res.json(member_progressList);
    }

    const getById = async (req, res) => {
        const {member_progress, error} = await member_progress.get(req.params.id);
        if(error){
            console.log("=== getById:: member_progress Error");
            return res.status(500).json(error);
        }
        res.json(member_progress);
    }

    const postController = async (req, res) => {   
        const {member_id, weight, measures} = req.body;

        var dateFormat = require("dateformat");
        var date = new Date();  
        
        // date = dateFormat(date_update, "dd:mm:yyyy");
        console.log("date = " + date);

        const {results, error} = await member_progress.add(date, member_id, weight, measures);
        if(error){       
            console.log("=== post:: member_progress Error", error);    
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