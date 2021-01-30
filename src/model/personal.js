const db = require('../../db')();
const COLLECTION = "personal_trainer";

module.exports = () => { 
    
  //Get personal trainers
    const get = async (id = null) => {
        console.log(' inside personal model');
        if(!id){
          try{
            const personals = await db.get(COLLECTION);
            return {personalList: personals};
          }catch(ex){
            return {error: ex}
          }           
        }

        try{
          const personals = await db.get(COLLECTION, {id});
          return {personalList: personals};   
        }catch(ex){
          return {error: ex}
        }
             
    }

    //Add personal trainer
    const add = async(name, email, mobile) => {
      console.log(' inside personal model add');
     
      try{
        const results = await db.add(COLLECTION, {
          id: id,
          name: name,
          email: email,
          mobile: mobile
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