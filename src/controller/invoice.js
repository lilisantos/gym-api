//Require model invoice
const invoice = require('../model/invoice.js')();

module.exports = () => {

    //Get invoices
    const getController = async (req, res) => {
        const {invoiceList, error} = await invoice.get();
        if(error){
            console.log("=== get:: invoice Error");
            return res.status(500).json(error);
        }
        
        res.json(invoiceList);
    }

    //Get invoice by id
    //This function is under construction due to problems with returning data
    const getById = async (req, res) => {
        const id = req.params.id;

        const {inv, error} = await invoice.get(id);
        if(error){
            console.log("=== getById:: invoice Error");
            return res.status(500).json({error});
        }
        
        res.json(inv);
    }

    //Get invoice by member
    const getByMember = async (req, res) => {
        const userEmail = req.params.userEmail;

        const {invoicesList, error} = await invoice.invoicesPerMember(userEmail);
        if(error){
            console.log("=== getByMember:: invoice Error");
            return res.status(500).json(error);
        }
        res.json(invoicesList);
    }

    //Add a new invoice
    const postController = async (req, res) => {   
        const {member_id, booking_id} = req.body;

        const {results, error} = await invoice.add(member_id, booking_id);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
    }

    return {
        getController,
        postController,
        getById,
        getByMember
    };
}