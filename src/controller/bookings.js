const bookings = require('../model/bookings.js')();
const slots = require('../model/slots.js')();
const members = require('../model/member.js')();

module.exports = () => {

    const getController = async (req, res) => {
        const {bookingsList, error} = await bookings.get();
        if(error){
            console.log("=== get:: Bookings Error");
            return res.status(500).json(error);
        }
        
        res.json(bookingsList);
    }

    const getById = async (req, res) => {
        const {booking, error} = await bookings.get(req.params.id);
        if(error){
            console.log("=== getById:: Bookings Error");
            return res.status(500).json(error);
        }
        res.json(booking);
    }

    const getFirst = async (req, res) => {
        const {booking, error} = await bookings.getFirst();
        if(error){
            console.log("=== getFirst:: Bookings Error");
            return res.status(500).json(error);
        }
        res.json(booking);
    }

    const postController = async (req, res) => {   
        const {slotId, userEmail, slotPersonalId, slotDate} = req.body;       

        const {results, error} = await bookings.add(userEmail, slotId,  slotPersonalId, slotDate);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
        res.status(200);
    };

    const cancelBooking = async (req, res) => {
        const bookingId = req.params.booking_id;

        const Nnew_status = "cancelled";

        //Calls the add method on the issues model
        const {result, error} = await bookings.cancelBooking(bookingId, new_status);
        if(error){
            console.log("=== cancelBooking:: Bookings Error", error);
            return res.status(500).json(error);
        }
        res.json(result);
    };
   
    return {
        getController,
        postController,
        getById,
        getFirst,
        cancelBooking,
        // populatedController,
    };
}