const router = require('express').Router();
const pool = require('../../db');



// -- routes -- //

// get all recipes
router.get('/', async(req, res) => {
    const recipes = await pool.query("SELECT * FROM recipes");
    res.send(recipes.rows);
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

        const addRecipe = await pool.query("INSERT INTO recipes() VALUES()", [id]);

        res.send(recipe);
    } catch (error) {
        console.log(error)
        res.status(500);
    }
})


module.exports = router;