const { ObjectID } = require('mongodb');
const slots = require('../controller/slots');

const db = require('../../db')();
const COLLECTION = "slots";

module.exports = () => { 
    
    const get = async (date = null) => {
      console.log(' inside bookings model');
      if(!date){
        try{
          const slots = await db.get(COLLECTION);
          return {slotsList: slots};
        }catch(ex){
          return {error: ex}
        }           
      }

      try{
        const slots = await db.get(COLLECTION, {date});
        return {slotsList: slots};   
      }catch(ex){
        return {error: ex}
      }
           
    }

    const add = async(date, personal_id) => {
      console.log(' inside slots model add');
     
    
      try{
        const results = await db.add(COLLECTION, {
            date: date,
            personal: ObjectID(personal_id),
            status: "available"
         });
         return results.result;
      }catch(ex){
          return {error: ex}
      }
    };

    const update = async (slotId, new_status) => {
        if(!slotId){
            console.log("Slot id required to cancel");
            return null;
        }

        const PIPELINE = [
            { _id : ObjectID(slotId)},
            { $set: { status: new_status }}
          ];

       try{
            const results = await db.update(COLLECTION, PIPELINE);
            return results.result;
       }catch(ex){
        return {error: ex}
       }
       
    };

    const aggregateDateOnly = async(date) => {       
       
      // Pipeline to filter the date without the time, 
      // what is passed to the next stage and matches only the slots
      // that are available and on the day selected by the user 
        const PIPELINE_SLOTS_DATEONLY = [
          {
            $project: {
               dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
               'status': true,
               'personal': true,
               'date': true
            }
          },
          {
             $match: 
                 { 
                    $and:[       
                        {dateOnly: date},
                        {'status': 'available'}
                    ]                 
                 }
          }       
        ];

        try {
          const slots = await db.aggregate(COLLECTION, PIPELINE_SLOTS_DATEONLY);
          return {slotsList: slots};
        }catch(ex){
          return {error: ex}
        }        
    }

    return {
        get,
        add,
        update,
        aggregateDateOnly,
    }
};