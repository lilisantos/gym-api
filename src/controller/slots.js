const db = require('../../db.js');

const slots = require('../model/slots.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {slotsList, error} = await slots.get();
        if(error){
            console.log("=== get:: slots Error");
            return res.status(500).json(error);
        }
        
        res.json(slotsList);
    }

    const getByDate = async (req, res) => {
        const date = req.params.date;

        console.log("date contr: " + req.params);

        const {slot, error} = await slots.get(date);

        if(error){
            console.log("=== getByDate:: slots Error");
            return res.status(500).json(error);
        }
        res.json(slot);
    }

    const postController = async (req, res) => {   
        const {slot_date, personal_id} = req.body;

        var dateFormat = require("dateformat");
        // var date = new Date();  
        
        date = dateFormat(slot_date, "isoDateTime");
       
        const {results, error} = await slots.add(date, personal_id);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
    };

    const update = async (req, res) => {
        const slotId = req.params.slot_id;

        const new_status = "booked";

        //Calls the add method on the issues model
        const {result, error} = await slots.update(slotId, new_status);
        if(error){
            console.log("=== cancelBooking:: Slots Error", error);
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
        getByDate,
        update,
        // populatedController,
    };
}