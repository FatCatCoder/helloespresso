const router = require('express').Router();
const pool = require('../../db');



// -- routes -- //

/*
// get all recipes
router.get('/', async(req, res) => {
    const recipes = await pool.query("SELECT * FROM recipes ORDER BY roastdate DESC LIMIT 20");
    res.send(recipes.rows);
})
*/
// give total number of recipes
router.get('/', async(req, res) => {
    const recipesAmount = await pool.query("SELECT COUNT(id) FROM recipes");
    res.send(recipesAmount.rows[0]["count"]);
})

// get all recipes on a page
router.post('/', async(req, res) => {
    try{
        const {offsetPage, limitAmount} = req.body;

        const recipes = await pool.query("SELECT * FROM recipes LIMIT $1 OFFSET $2", [limitAmount, offsetPage * limitAmount]);
        
        res.send(recipes.rows);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

// get single recipe based on param id
router.get('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        
        const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
        
        res.send(recipe.rows);
    }
    catch(err){
        console.log(err)
    }
})

// add new recipe 
router.post('/new', async (req,res) => {
    try {
        const recipe = req.body;
        console.log(recipe);

        const addRecipe = await pool.query("INSERT INTO recipes(user_id, bean, region, roaster, roastDate, dose, yield, time, grind, grinder, machine, tastingNotes, notes, roast, process) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *", [recipe.userId, recipe.bean, recipe.region, recipe.roaster, recipe.roastDate, recipe.dose, recipe.yield, recipe.time, recipe.grind, recipe.grinder, recipe.machine, recipe.tastingNotes, recipe.notes, recipe.roast, recipe.process]);
        //console.log(addRecipe.rows[0]);
        res.send(addRecipe.rows[0]);

    } catch (error) {
        console.log(error)
        res.status(500);
    }
})





// -- like routes -- //




//get number of likes on a recipe
router.post('/likes', async(req, res) => {
    try{
    const {id} = req.body;
    
    const recipes = await pool.query("SELECT COUNT(*) FROM likes WHERE recipe_id = $1", [id]);
    res.send(recipes.rows[0].count);

    }
    catch (error) {
        res.status(500);
    }
})

//like a recipe
router.post('/like', async(req, res) => {
    
    try{
        const {user_id, recipe_id} = req.body;
        
        const isLiked = await pool.query("SELECT * FROM likes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);
        
        if(isLiked.rowCount === 0){
            const like = await pool.query("INSERT INTO likes(user_id, recipe_id) VALUES($1, $2)", [user_id, recipe_id]);
            return res.json({"bool": true});
        }
        else{
            const unLike = await pool.query("DELETE FROM likes WHERE user_id = $1 AND recipe_id =$2", [user_id, recipe_id]);
            return res.json({"bool": false});
        }
    }
    catch (error) {
        res.status(500);
    }
})

//check if a recipe is liked by user
router.post('/liked', async(req, res) => {
    
    try{
        const {user_id, recipe_id} = req.body;
        
        const isLiked = await pool.query("SELECT * FROM likes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);
        
        if(isLiked.rowCount === 1){
            return res.json({"bool": true});
        }
        else if (isLiked.rowCount === 0){
            return res.json({"bool": false});
        }
        else{
            return res.json({"bool": false});
        }
    }
    catch (error) {
        res.status(500);
    }
})

module.exports = router;