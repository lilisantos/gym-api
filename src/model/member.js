// const personal = require('./personal');

const db = require('../../db')();
const COLLECTION = "member";

module.exports = () => { 
    
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

    const add = async(add, email, dob, goal_weight, personal_id) => {
      console.log(' inside member model add');

      // try{
      //   //Checks if any of the fields is null
      //   if (!id || !name){       
      //       console.log("===== Not all the fields have been provided:: add PersonalModel Error");   
      //       return null;
      //   }
      // }catch(ex){       
      //     return {error: ex}
      // }       
 
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
        // aggregateWithIssues,
    }
};