const db = require('../../db')();
const { ObjectID } = require('mongodb');
const COLLECTION = "invoice";

module.exports = () => { 
    
    const get = async (id = null) => {
        console.log(' inside invoice model');
        if(!id){
          try{
            const invoices = await db.get(COLLECTION);
            return {invoiceList: invoices};
          }catch(ex){
            return {error: ex}
          }           
        }
        console.log("id: " + id)
        try{
          const inv = await db.get(COLLECTION, {id});
          console.log("invoice model: " + inv)
          return {inv};   
        }catch(ex){
          console.log("=====invoice error: " + ex)
          return {error: ex}
        }
             
    }

    const add = async(member_id, booking_id) => {
      console.log(' inside invoice model add');
     
 
      try{
        const results = await db.add(COLLECTION, {
          member: member_id,
          booking: booking_id,
          status: "pending",
          amount: "€50"
         });
         return results.result;
      }catch(ex){
          return {error: ex}
      }
    }
    
    const invoicesPerMember = async(userEmail) => {             
         //Get memberId
         console.log("userEmail model: " + userEmail);
      const member = await db.findMemberId(userEmail);
      console.log("memberid: " + member);

        // Pipeline to get only the necessary info to add a new booking
          const PIPELINE_INVOICE_MEMBER = [
            {
                $match: {
                    'member': member
                }
            },          
             {
                $lookup: {
                    from: "bookings",
                    localField: "booking",
                    foreignField: "date",
                    as: "booking_date",
                },
            },
            {
                $project: {
                  //  dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                   'member': true,
                   'amount': true,
                   'booking': true,
                   'booking_date':true
                }
              },
                   
          ];  
          try {
            const invoices = await db.aggregate(COLLECTION, PIPELINE_INVOICE_MEMBER);
            console.log("agg model: " + JSON.stringify(invoices));
            return {invoicesList: invoices};
          }catch(ex){
              console.log("=== erro: " + ex)
            return {error: ex}
          }        
      }

    return {
        get,
        add,
        invoicesPerMember
    }
};