const db = require('../../db')();
const { ObjectID } = require('mongodb');
const COLLECTION = "invoice";

module.exports = () => { 
    
    //Get invoice
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
        
        //Get invoice by id
        //This function is under construction due to problems with returning data
        try{
          const inv = await db.get(COLLECTION, {id});         
          return {inv};   
        }catch(ex){
          console.log("=====invoice error: " + ex)
          return {error: ex}
        }
             
    }

    //Add a new invoice
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
    
    //Returns invoices per member
    const invoicesPerMember = async(userEmail) => {             
      //Get memberId
      const member = await db.findMemberId(userEmail);
      
        // Pipeline to get only the necessary info to add a new booking
          const PIPELINE_INVOICE_MEMBER = [
            {
                $match: {
                    'member': member
                }
            },          
            
            {
                $project: {
                   'member': true,
                   'amount': true,
                   'booking': true,
                   'booking_date':true
                }
              },
                   
          ];  
          try {
            const invoices = await db.aggregate(COLLECTION, PIPELINE_INVOICE_MEMBER);
            return {invoicesList: invoices};
          }catch(ex){
              console.log("=== error aggreagation -> Invoice: " + ex)
            return {error: ex}
          }        
      }

    return {
        get,
        add,
        invoicesPerMember
    }
};