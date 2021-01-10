const db = require('../../db')();
const COLLECTION = "personal_trainer";

module.exports = () => { 
    
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

    const add = async(id, name) => {
      console.log(' inside personal model add');
     
      // const checkProject = await db.findProjectID(slug);
      // try{
      //     //if a project was found, return error message
      //     if(checkProject != null){
      //       console.log("===== Project already registered with this slug:: add ProjectModel Error");              
      //       return null;
           
      //     }
      // }catch(ex){       
      //     return {error: ex}
      // }

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
          id: id,
          name: name,
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