//Require model member_progress
const member_progress = require('../model/member_progress.js')();

module.exports = () => {

    //Get progress
    const getController = async (req, res) => {
        const {member_progressList, error} = await member_progress.get();
        if(error){
            console.log("=== get:: member_progress Error");
            return res.status(500).json(error);
        }
        
        res.json(member_progressList);
    }

    //Get progress by id
    const getById = async (req, res) => {
        const {member_progress, error} = await member_progress.get(req.params.id);
        if(error){
            console.log("=== getById:: member_progress Error");
            return res.status(500).json(error);
        }
        res.json(member_progress);
    }

    //Add new progress
    const postController = async (req, res) => {   
        const {member_id, weight, measures} = req.body;

        //Get current date
        var date = new Date();  

        const {results, error} = await member_progress.add(date, member_id, weight, measures);
        if(error){       
            console.log("=== post:: member_progress Error", error);    
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