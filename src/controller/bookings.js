const bookings = require('../model/bookings.js')();

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
        const {type, member_id, personal_id, booking_date, fee, status} = req.body;

        var dateFormat = require("dateformat");
        var isodate = new Date().toISOString();
        
        isodate = dateFormat(booking_date, "isoDateTime");
        console.log("date = " + date);

        const {results, error} = await bookings.add(id, type, member_id, personal_id, date, fee, status);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
    };

    const cancelBooking = async (req, res) => {
        const bookingId = req.params.booking_id;

        const new_status = "cancelled";

        //Calls the add method on the issues model
        const {result, error} = await bookings.cancelBooking(bookingId, new_status);
        if(error){
            console.log("=== cancelBooking:: Bookings Error", error);
            return res.status(500).json(error);
        }
        res.json(result);
    };

    // const populatedController = async (req, res) => {
    //     const {projectIssues, error} = await projects.aggregateWithIssues(req.params.slug);
    //     if(error){
    //         console.log("=== aggregate:: Projects Error");
    //         return res.status(500).json(error);
    //     }
    //     res.json(projectIssues);
    // };

  
   
    return {
        getController,
        postController,
        getById,
        getFirst,
        cancelBooking,
        // populatedController,
    };
}