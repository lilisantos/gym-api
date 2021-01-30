const db = require('../../db.js');

const personal = require('../model/personal.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {personalList, error} = await personal.get();
        if(error){
            console.log("=== get:: Personal Error");
            return res.status(500).json(error);
        }
        
        res.json(personalList);
    }

    const getById = async (req, res) => {
        const {personal, error} = await personal.get(req.params.id);
        if(error){
            console.log("=== getById:: Personal Error");
            return res.status(500).json(error);
        }
        res.json(personal);
    }

    const postController = async (req, res) => {   
        const {name, email, mobile} = req.body;

        const {results, error} = await personal.add(name, email, mobile);
        if(error){           
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