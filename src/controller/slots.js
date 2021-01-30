//Require model slots
const slots = require('../model/slots.js')();

module.exports = () => {

    //Get slots
    const getController = async (req, res) => {
        const {slotsList, error} = await slots.get();
        if(error){
            console.log("=== get:: slots Error");
            return res.status(500).json(error);
        }
        
        res.json(slotsList);
    }

    //Get slots by id
    const getById = async (req, res) => {
        try{
            const {slot, error} = await slots.get(req.params.id);
            return res.json(slot);
        }catch(ex){
            console.log("=== getById:: Slots Error");
            return res.status(500).json({error: ex});
        }
    }
   
    //Get slots by date
    const getByDate = async (req, res) => {
        const date = req.params.date;

        const {slotsList, error} = await slots.aggregateDateOnly(date);

        if(error){
            console.log("=== getByDate:: slots Error");
            return res.status(500).json(error);
        }
        res.json(slotsList);
    }

    const postController = async (req, res) => {   
        const {slot_date, personal_id} = req.body;

        var dateFormat = require("dateformat");
        //Format date to isotime
        date = dateFormat(slot_date, "isoDateTime");
       
        const {results, error} = await slots.add(date, personal_id);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
    };

    //Update slot status when it is booked
    const update = async (req, res) => {
        const slotId = req.params.slot_id;

        const new_status = "unavailable";

        //Calls the add method on the slots model
        const {result, error} = await slots.update(slotId, new_status);
        if(error){
            console.log("=== update Slot:: Slots Error", error);
            return res.status(500).json(error);
        }
        res.json(result);
    };

    return {
        getController,
        postController,
        getByDate,
        getById,
        update,
    };
}