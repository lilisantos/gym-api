//Require model member_meals
const member_meals = require('../model/member_meals.js')();

module.exports = () => {

    //Get meals
    const getController = async (req, res) => {
        const {mealsList, error} = await member_meals.get();
        if(error){
            console.log("=== get:: Bookings Error");
            return res.status(500).json(error);
        }
        
        res.json(mealsList);
    }

    //Get meal by id
    const getById = async (req, res) => {
        const {meal, error} = await member_meals.get(req.params.id);
        if(error){
            console.log("=== getById:: meal Error");
            return res.status(500).json(error);
        }
        res.json(meal);
    }

    //Add meal
    const postController = async (req, res) => {   
        const {userEmail, type, food, calories, carbs, protein, fat} = req.body;       

        const {results, error} = await member_meals.add(userEmail, type, food, calories, carbs, protein, fat);
        if(error){           
            return res.status(500).json(error);
        }

        res.json(results);
        res.status(200);
    };

    return {
        getController,
        postController,
        getById,
    };
}