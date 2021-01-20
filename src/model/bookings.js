const { ObjectID } = require('mongodb');

const db = require('../../db')();
const COLLECTION = "bookings";

module.exports = () => { 
    
    const get = async (id = null) => {
        console.log(' inside bookings model');
        if(!id){
          try{
            const bookings = await db.get(COLLECTION);
            return {bookingsList: bookings};
          }catch(ex){
            return {error: ex}
          }           
        }

        try{
          const bookings = await db.get(COLLECTION, {id});
          return {bookingsList: bookings};   
        }catch(ex){
          return {error: ex}
        }
             
    }

    const getFirst = async () => {
     const PIPELINE_FIRST =  [
      {
        $match: {"status": "booked"} //Gets only aactive bookings      
      }];

      try{
        const booking = await db.aggregate(COLLECTION, PIPELINE_FIRST);
        return {booking: booking};   
      }catch(ex){
        return {error: ex}
      }
           
  }

    const add = async(type, member_id, personal_id, date, fee, status) => {
      console.log(' inside bookings model add');
     
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
            type: type,
            member:  ObjectID(member_id),
            personal: ObjectID(personal_id),
            date: ISODate(date),
            fee: fee,
            status: status
         });
         return results.result;
      }catch(ex){
          return {error: ex}
      }
    };

    const cancelBooking = async (bookingId, new_status) => {
        if(!bookingId){
            console.log("Booking id required to cancel");
            return null;
        }

        console.log("BookingId:" + bookingId);
        console.log("status:" + new_status);

        const PIPELINE = [
            { _id : ObjectID(bookingId)},
            { $set: { status: new_status }}
          ];

          console.log("pipeline:" + PIPELINE);

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
        cancelBooking,
        // aggregateWithIssues,
    }
};