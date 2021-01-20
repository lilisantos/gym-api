const { ObjectID } = require('mongodb');

const db = require('../../db')();
const COLLECTION = "slots";

module.exports = () => { 
    
    const get = async (date = null) => {
        console.log(' inside slots model');
       
        if(!date){
          try{
            const slots = await db.get(COLLECTION);
            return {slotsList: slots};
          }catch(ex){
            return {error: ex}
          }           
        }
        console.log("date: " + date); 

     
        try{
          const slot = await db.get(COLLECTION, {date});
          return {slot};   
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

    // const aggregateWithIssues = async(slug) => {       
    //     //Pipeline that searches for the project with the slug provided
    //     const LOOKUP_ISSUES_PIPELINE = [
    //         {
    //             $match: {
    //                 "slug": slug,
    //             }
    //         },
    //         {
    //             $lookup: {
    //                 from: "issues",
    //                 localField: "_id",
    //                 foreignField: "project",
    //                 as: "issues",
    //             }
    //         },
    //     ];

    //     try {
    //       const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
    //       return projects;
    //     }catch(ex){
    //       return {error: ex}
    //     }        
    // }

    return {
        get,
        add,
        update,
        // aggregateWithIssues,
    }
};