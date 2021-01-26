const { ObjectID } = require('mongodb');

const db = require('../../db')();
const COLLECTION = "bookings";
//Require slots model
const slots = require('./slots.js')();

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

    const add = async(userEmail, slotId, slotPersonalId, slotDate) => {
      console.log(' inside bookings model add');    
      
        //Checks if any of the fields is null
        if (!userEmail || !slotPersonalId || !slotDate){       
          console.log("===== Not all the fields have been provided:: add booking Error");   
          return null;
      }

      //Get memberId
        const memberId = await db.findMemberId(userEmail);
     

      //  //Get slot info (date, personalId and type)
      //  try{
      //   const slot = await slots.aggregateSlotInfo(slotId);
      //   console.log("slot: " + slot);
      //   const dateSlot = slot.date;
      //   const personalId = slot.personal;

      //   // console.log("date: " + dateSlot + "  - personal: " + personalId);
      // }catch(ex){
      //   console.log("deu ruim getslotinfo: " + ex);
      //     return {error: ex}
      // }

      
      try{
        const results = await db.add(COLLECTION, {
            type: "workout",
            member:  memberId,
            personal: slotPersonalId,
            date: slotDate,
            fee: "due",
            status: "booked"
         });
         return results.result;
      }catch(ex){
        console.log("deu ruim save booking" + ex);
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