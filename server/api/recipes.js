const router = require('express').Router();
const pool = require('../../db');
const serverTimingMiddleware = require('server-timing-header');


// -- Utils -- //

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
router.get('/total', async(req, res) => {
    const recipesAmount = await pool.query("SELECT COUNT(id) AS count FROM recipes");
    res.send(recipesAmount.rows[0]["count"]);
})

// get recipes based on parameters, main API entry
router.post('/', async(req, res) => {
    try{
        req.serverTiming.from('api');
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
            const userIdFix = filtersList.indexOf(filtersList.find(x => x[0] == 'user_id'));
            if(userIdFix !== -1){
                console.log(filtersList[userIdFix][1])
                filtersList[userIdFix][1] = filtersList[userIdFix][1].replace(/\ /g, '-');
                console.log(filtersList[userIdFix][1].replace(/\ /g, '-'))
            }
            console.log('fix', userIdFix)

            var likedByUserIdFix = filtersList.indexOf(filtersList.find(x => x[0] == 'liked_by_user_id'));
            if(likedByUserIdFix !== -1){
                console.log(filtersList[likedByUserIdFix][1])
                filtersList[likedByUserIdFix][1] = filtersList[likedByUserIdFix][1].replace(/\ /g, '-');
                console.log(filtersList[likedByUserIdFix][1].replace(/\ /g, '-'))
            }
            console.log('fix', likedByUserIdFix)

            // whitelist sort method
            const availableSortKeys = ["postdate ASC", "postdate DESC", "roastdate ASC", "roastdate DESC", "popular DESC"];
            // whitelist filters
            const availableFilterKeys = ["bean", "roaster", "roast", "region", "grinder", "machine", "process", "user_id", "liked_by_user_id"];

            // the sort method requested
            const sortRequest = availableSortKeys.find(x => x == sortFilters.sortBy);
            // all the filters applied to the query
            const allFilters = filtersList.filter(x => availableFilterKeys.includes(x[0]) && x[1] !== "");

            console.log(allFilters)

            const addFilters = (WHERE_OR_HAVING) => {
                queryStr += ` ${WHERE_OR_HAVING}`;

                var filterArray = allFilters.map((currVal, index) =>
                    //` R.${currVal[0]} = '${currVal[1]}'`).join(" AND");

                    ` SIMILARITY(CAST(${currVal[0] !== 'liked_by_user_id'? `R.${currVal[0]}`: `L.user_id`} AS TEXT), CAST('${currVal[1]}' AS TEXT)) > 0.4`).join(" AND");

                console.log(filterArray)

                queryStr += filterArray;
            }
           

        // insert clean sort method into query

        console.log(sortRequest);

            // simpler search query
            if(sortRequest !== 'popular DESC' & sortRequest !== undefined){

                // base query
                var queryStr = `SELECT *, COUNT(*) OVER() AS count FROM recipes AS R ${likedByUserIdFix !== -1?  `INNER JOIN likes AS L
                ON (R.id = L.recipe_id AND L.user_id = '${filtersList[likedByUserIdFix][1]}')`
                : ``}`

                // check for filters, then add sort method
                if((allFilters !== null || allFilters !== undefined) & allFilters.length >= 1){ addFilters('WHERE') }
                queryStr += ` ORDER BY ${sortRequest}`;
            }
            // if sort by likes, use join query
            else if(sortRequest === "popular DESC"){
                // likedByUserIdFix !== -1
                // base query
                var queryStr = `SELECT R.*, COUNT(*) OVER() AS count, ${likedByUserIdFix !== -1? `(SELECT COUNT(*) AS popular FROM likes WHERE recipe_id = R.id)` : `COUNT(L.recipe_id) AS popular`}
                FROM recipes AS R
                LEFT JOIN likes AS L
                ON (R.id = L.recipe_id)
                GROUP BY ${likedByUserIdFix !== -1? `r.id, r.user_id, r.bean, r.region, r.roaster, r.roastdate, r.postdate, r.dose, r.yield, r.time, r.grind, r.grind, r.machine, r.tastingnotes, r.notes, r.roast, r.process, l.user_id` : `R.id`}`;

                //GROUP BY R.id

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

            req.serverTiming.from('db');
            var recipes = await pool.query(queryStr);
            req.serverTiming.to('db');
        }
        req.serverTiming.to('api');
        //console.log('count', recipes.rowCount,'\n',recipes.rows[0], '\n', recipes, recipes.rowCount === 0? [] : recipes.rows);
        res.send(recipes.rowCount === 0? [{"count": 0}] : recipes.rows);
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
        console.log(recipe)
        res.send(recipe.rows);
    }
    catch(err){
        console.log(err)
        res.send([null])
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

// batch get number of likes on a recipe
router.post('/all-likes', async(req, res) => {
    try{
        const ids = req.body;
        
        const recipes = await pool.query(
            `SELECT L.recipe_id AS id, COUNT(L.recipe_id) AS likes
         FROM unnest(ARRAY[${ids.map(x => `'${x}'`)}]) idFromArray
         INNER JOIN likes AS L on CAST(L.recipe_id AS TEXT) = CAST(idFromArray AS TEXT)
         GROUP BY L.recipe_id`);

        console.log(recipes.rows);
        res.send(recipes.rows);
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