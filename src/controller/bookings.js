//Require model bookings
const bookings = require('../model/bookings.js')();

module.exports = () => {

    //Get bookings
    const getController = async (req, res) => {
        const {bookingsList, error} = await bookings.get();
        if(error){
            console.log("=== get:: Bookings Error");
            return res.status(500).json(error);
        }
        
        res.json(bookingsList);
    }

    //Get booking by id
    const getById = async (req, res) => {
        const {booking, error} = await bookings.get(req.params.id);
        if(error){
            console.log("=== getById:: Bookings Error");
            return res.status(500).json(error);
        }
        res.json(booking);
    }

    //Get next booking scheduled
    const getFirst = async (req, res) => {
        const {booking, error} = await bookings.getFirst();
        if(error){
            console.log("=== getFirst:: Bookings Error");
            return res.status(500).json(error);
        }
        res.json(booking);
    }

    //Add a new booking
    const postController = async (req, res) => {   
        const {slotId, userEmail, slotPersonalId, slotDate} = req.body;       

        const {results, error} = await bookings.add(userEmail, slotId,  slotPersonalId, slotDate);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
        res.status(200);
    };

    //Cancel booking
    const cancelBooking = async (req, res) => {
        const bookingId = req.params.booking_id;

        const new_status = "cancelled";

        //Calls the add method on the bookings model
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
    };
}