const db = require('../../db.js');

const invoice = require('../model/invoice.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {invoiceList, error} = await invoice.get();
        if(error){
            console.log("=== get:: invoice Error");
            return res.status(500).json(error);
        }
        
        res.json(invoiceList);
    }

    const getById = async (req, res) => {
        const {id} = req.body;
        console.log("id: " + id);

        const {inv, error} = await invoice.get(id);
        if(error){
            console.log("=== getById:: invoice Error");
            return res.status(500).json({error});
        }
        console.log("invoice cont: " + inv);
        res.json(inv);
    }

    const getByMember = async (req, res) => {
        // const member_id = req.params.member_id;

        const userEmail = req.params.userEmail;
        console.log("userEmail ctl: " + userEmail);

        const {invoicesList, error} = await invoice.invoicesPerMember(userEmail);
        console.log("agg ctl: " + JSON.stringify(invoicesList));
        if(error){
            console.log("=== getByMember:: invoice Error");
            return res.status(500).json(error);
        }
        res.json(invoicesList);
    }

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