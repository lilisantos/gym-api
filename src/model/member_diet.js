const { ObjectID } = require('mongodb');
const db = require('../../db')();
const COLLECTION = "member_diet";

module.exports = () => { 
    
    //Get diets
    const get = async (id = null) => {
        console.log(' inside member_diet model');
        if(!id){
          try{
            const member_diet = await db.get(COLLECTION);
            return {member_dietList: member_diet};
          }catch(ex){
            return {error: ex}
          }           
        }

        try{
          const member_diet = await db.get(COLLECTION, {id});
          return {member_dietList: member_diet};   
        }catch(ex){
          return {error: ex}
        }
             
    }

    //Add a new diet
    const add = async(member_id, date, dci, protein, carbs, fat, personal_id) => {
      console.log(' inside member_diet model add');
     
      try{
        const results = await db.add(COLLECTION, {
          date: date,
          member: ObjectID(member_id),
          dci: dci, 
          protein: protein, 
          carbs: carbs, 
          fat: fat,
          personal: ObjectID(personal_id)
         });
         return results.result;
      }catch(ex){
          return {error: ex}
      }
    }
    
    //Update diet
    const update = async (memberId, dci, protein, carbs, fat) => {

      const PIPELINE_DIET = [
          { member : ObjectID(memberId)},            
          {
            $set: 
              {   
                dci: dci, 
                protein: protein, 
                carbs: carbs, 
                fat: fat
              }
          }            
        ];

       try{
            const results = await db.update(COLLECTION, PIPELINE_DIET);
           
            return results.result;
       }catch(ex){
        return {error: ex}
       }
       
    };

    return {
        get,
        add,
        update,
    }
};