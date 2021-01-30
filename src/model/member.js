const db = require('../../db')();
const COLLECTION = "member";

module.exports = () => { 

    //Get  member
    const get = async (email = null) => {
        console.log(' inside member model');
        if(!email){
          try{
            const members = await db.get(COLLECTION);
            return {memberList: members};
          }catch(ex){
            return {error: ex}
          }           
        }
        try{
          const member = await db.get(COLLECTION, {email});
          console.log("member model: " + member);
          return {member};   
        }catch(ex){
          return {error: ex}
        }
             
    }

    //Add new member
    const add = async(name, email, dob, goal_weight, personal_id) => {
      console.log(' inside member model add');
 
      try{
        const results = await db.add(COLLECTION, {
          name: name,
          email: email,
          dob: dob,
          goal_weight: goal_weight,
          personal: personal_id
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