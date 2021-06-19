const router = require('express').Router();
const pool = require('../../db');



// routes
router.get('/', async(req, res) => {
    const recipes = await pool.query("SELECT * FROM recipes");
    res.send(recipes.rows);
})

router.get('/:id', async(req, res) => {
    try{
    const {id} = req.params;
    console.log(id)
    const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
    console.log('sent recipe request', recipe.rows)
    res.send(recipe.rows);
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router;