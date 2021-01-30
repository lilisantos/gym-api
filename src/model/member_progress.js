const { ObjectID } = require('mongodb');

const db = require('../../db')();
const COLLECTION = "member_progress";

module.exports = () => { 
    
  //Get progress
    const get = async (id = null) => {
        console.log(' inside member_progress model');
        if(!id){
          try{
            const member_progress = await db.get(COLLECTION);
            return {member_progressList: member_progress};
          }catch(ex){
            return {error: ex}
          }           
        }

        try{
          const member_progress = await db.get(COLLECTION, {id});
          return {member_progressList: member_progress};   
        }catch(ex){
          return {error: ex}
        }
             
    }

    //Add new progress
    const add = async(date, member_id, weight, measures) => {
      console.log(' inside member_progress model add');
     
      try{
        const results = await db.add(COLLECTION, {
          date: date,
          member: ObjectID(member_id),
          weight: weight, 
          measures: measures
         });
         return results.result;
      }catch(ex){
          return {error: ex}
      }
    }

    return {
        get,
        add,
    }
};