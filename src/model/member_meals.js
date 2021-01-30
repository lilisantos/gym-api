const { ObjectID } = require('mongodb');
const db = require('../../db')();
const COLLECTION = "member_meals";

module.exports = () => { 

  //Get meals  
    const get = async (id = null) => {
        console.log(' inside meals model');
        if(!id){
          try{
            const meals = await db.get(COLLECTION);
            return {mealsList: meals};
          }catch(ex){
            return {error: ex}
          }           
        }

        try{
          const meal = await db.get(COLLECTION, {id});
          return {mealList: meal};   
        }catch(ex){
          return {error: ex}
        }
             
    }

    //Add new meal
    const add = async(userEmail, type, food, calories, carbs, protein, fat) => {
      console.log(' inside meals model add');         
      
      //Get memberId
      const memberId = await db.findMemberId(userEmail);

      try{
        const results = await db.add(COLLECTION, {
            type: type,
            member:  memberId,
            food: food, 
            calories:calories,
            carbs: carbs,
            protein: protein,
            fat: fat
         });
         return results.result;
      }catch(ex){
          return {error: ex}
      }
    };

    return {
        get,
        add,
    }
};