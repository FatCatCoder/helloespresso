const router = require('express').Router();
const pool = require('../../db');


// -- Tools -- //

// check if string is alphanumeric
function isAlphaNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123) && // lower alpha (a-z)
          !(code === 32)) { // space
        return false;
      }
    }
    return true;
  };

// return total number recipes from query
function totalRecipes(query){
    const qry = 'COUNT(*) OVER() AS count';
}



// -- routes -- //


// give total number of recipes
router.get('/', async(req, res) => {
    const recipesAmount = await pool.query("SELECT COUNT(id) FROM recipes");
    res.send(recipesAmount.rows[0]["count"]);
})

// get all recipes on a page
router.post('/', async(req, res) => {
    try{
        const {offsetPage, limitAmount, sortFilters} = req.body;

        const filtersList = Object.entries(sortFilters);
        console.log(filtersList)

        const checkForBadChars = filtersList.every((x, y) => isAlphaNumeric(x[1]));
        console.log(checkForBadChars)

        if(!checkForBadChars){
            console.log('bad char')
            return res.status(405).send({"errorMsg": "Invaild Character in request"})
        }

        // if no filters, just get all posts
        if(sortFilters == undefined || Object.keys(sortFilters).length === 0){
            
            var recipes = await pool.query("SELECT *, COUNT(*) OVER() AS count FROM recipes LIMIT $1 OFFSET $2", [limitAmount, offsetPage * limitAmount]);
            
        }
        // sort by post date
        else{
            const userIdFix = filtersList.find(x => x[0] == 'user_id');
            console.log('fix', userIdFix)

            // whitelist sort method
            const availableSortKeys = ["postdate ASC", "postdate DESC", "roastdate ASC", "roastdate DESC", "popular DESC"];
            // whitelist filters
            const availableFilterKeys = ["bean", "roaster", "roast", "region", "grinder", "machine", "process", "user_id"];

            // the sort method requested
            const sortRequest = availableSortKeys.find(x => x == sortFilters.sortBy);
            // all the filters applied to the query
            const allFilters = filtersList.filter(x => availableFilterKeys.includes(x[0]) && x[1] !== "");

            console.log(allFilters)

            const addFilters = (WHERE_OR_HAVING) => {
                queryStr += ` ${WHERE_OR_HAVING}`;

                var filterArray = allFilters.map((currVal, index) =>
                    //` R.${currVal[0]} = '${currVal[1]}'`).join(" AND");
                   
                    ` SIMILARITY(R.${currVal[0]}, '${currVal[1]}') > 0.4`).join(" AND");

                console.log(filterArray)

                queryStr += filterArray;
            }
           

        // insert clean sort method into query

        console.log(sortRequest);

            // simpler search query
            if(sortRequest !== 'popular DESC' & sortRequest !== undefined){

                // base query
                var queryStr = `SELECT *, COUNT(*) OVER() AS count FROM recipes AS R `

                // check for filters, then add sort method
                if((allFilters !== null || allFilters !== undefined) & allFilters.length >= 1){ addFilters('WHERE') }
                queryStr += ` ORDER BY ${sortRequest}`;
            }
            // if sort by likes, use join query
            else if(sortRequest === "popular DESC"){

                // base query
                var queryStr = `SELECT R.*, COUNT(*) OVER() AS count, COUNT(L.recipe_id) AS popular
                FROM recipes AS R
                LEFT JOIN likes AS L
                ON (R.id = L.recipe_id)
                GROUP BY R.id`;

                // check for filters, then add sort method
                if((allFilters !== null || allFilters !== undefined) & allFilters.length >= 1){ addFilters('HAVING') }
                queryStr += ` ORDER BY ${sortRequest}`;
            }

            else {
                // catch error
                res.status(405)
            }

            // before final query add limit and offset (for pagination)
            queryStr += ` LIMIT ${limitAmount} OFFSET ${offsetPage * limitAmount}`

            console.log(queryStr)
            var recipes = await pool.query(queryStr);
        }
        console.log('count', recipes.rowCount,'\n',recipes.rows[0]);
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
            const like = await pool.query("INSERT INTO likes(user_id, recipe_id) VALUES($1, $2) RETURNING *", [user_id, recipe_id]);
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