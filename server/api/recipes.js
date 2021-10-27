const router = require('express').Router();
const pool = require('../../db');
const blacklistCheck = require('../utils/blacklist');
const jwtDecoder = require('../utils/jwtDecoder')
const Joi = require('joi');

// require('server-timing-header');


//  --  Utils -- //

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
  }

const recipeSchema = Joi.object({
    userId: Joi.string().token().required(),
    bean: Joi.string().required(),
    region: Joi.string().required(),
    roaster: Joi.string().required(),
    roastDate: Joi.date().required(),
    dose: Joi.string().max(5).required(),
    yield: Joi.string().max(5).required(),
    time: Joi.string().max(5).required(),
    grind: Joi.string().required(),
    grinder: Joi.string().required(),
    machine: Joi.string().required(),
    tastingNotes: Joi.string().required(),
    notes: Joi.string(),
    roast: Joi.string().required(),
    process: Joi.string().required(), 
})


//  -- Routes -- //

// give total number of recipes
router.get('/total', async(req, res) => {
    const recipesAmount = await pool.query("SELECT COUNT(id) AS count FROM recipes");
    res.send(recipesAmount.rows[0]["count"]);
})

// get recipes based on parameters, main API entry
    // accepts json from request body, then sanatizes and build SQL query based on sorting and fitlers
    // relies on mutation of -- var query: sting!
    // very procedutual apporach, looks messy but is still quite preformant, will refactor in the future if doesnt meet production demand

router.post('/', async(req, res) => {
    try{
        // timing-api on response -- start -- req.serverTiming.from('api'); 
        const {offsetPage, limitAmount, sortFilters} = req.body;

        const filtersList = Object.entries(sortFilters);

        const checkForBadChars = filtersList.every((x) => isAlphaNumeric(x[1]));

        if(!checkForBadChars){
            return res.status(405).send({"message": "Invalid Character in request"})
        }

        // if no filters, just get all posts
        if(sortFilters === undefined || Object.keys(sortFilters).length === 0){
            var recipes = await pool.query("SELECT *, COUNT(*) OVER() AS count FROM recipes LIMIT $1 OFFSET $2", [limitAmount, offsetPage * limitAmount]);
        }

        // sort by post date
        else{
            const userIdFix = filtersList.indexOf(filtersList.find(x => x[0] === 'user_id'));
            if(userIdFix !== -1){
                filtersList[parseInt(userIdFix)][1] = filtersList[parseInt(userIdFix)][1].replace(/\ /g, '-');
            }

            var likedByUserIdFix = filtersList.indexOf(filtersList.find(x => x[0] === 'liked_by_user_id'));
            if(likedByUserIdFix !== -1){
                filtersList[parseInt(likedByUserIdFix)][1] = filtersList[parseInt(likedByUserIdFix)][1].replace(/\ /g, '-');
            }

            // whitelists & active methods
            const availableSortKeys = ["postdate ASC", "postdate DESC", "roastdate ASC", "roastdate DESC", "popular DESC"];
            const availableFilterKeys = ["bean", "roaster", "roast", "region", "grinder", "machine", "process", "user_id", "liked_by_user_id"];

            const sortRequest = availableSortKeys.find(x => x == sortFilters.sortBy);
            const allFilters = filtersList.filter(x => availableFilterKeys.includes(x[0]) && x[1] !== "");

            const addFilters = (WHERE_OR_HAVING) => {
                queryStr += ` ${WHERE_OR_HAVING}`;

                var filterArray = allFilters.map((currVal) =>
                    ` SIMILARITY(CAST(${currVal[0] !== 'liked_by_user_id'? `R.${currVal[0]}`: `L.user_id`} AS TEXT), CAST('${currVal[1]}' AS TEXT)) > 0.2`).join(" AND");

                queryStr += filterArray;
            }  

            // insert clean sort method into query
            // simpler search query
            if(sortRequest !== 'popular DESC'){

                // base query
                var queryStr = `SELECT *, COUNT(*) OVER() AS count FROM recipes AS R ${likedByUserIdFix !== -1?  `INNER JOIN likes AS L
                ON (R.id = L.recipe_id AND L.user_id = '${filtersList[parseInt(likedByUserIdFix)][1]}')`
                : ``}`

                // check for filters, then add sort method
                if((allFilters !== null || allFilters !== undefined) & allFilters.length >= 1){ addFilters('WHERE') }
                queryStr += ` ORDER BY ${sortRequest ?? 'roastdate ASC'}`;
            }
            // if sort by likes, use join query
            else if(sortRequest === "popular DESC"){
                // base query
                var queryStr = `SELECT R.*, COUNT(*) OVER() AS count, ${likedByUserIdFix !== -1? `(SELECT COUNT(*) AS popular FROM likes WHERE recipe_id = R.id)` : `COUNT(L.recipe_id) AS popular`}
                FROM recipes AS R
                LEFT JOIN likes AS L
                ON (R.id = L.recipe_id)
                GROUP BY ${likedByUserIdFix !== -1? `r.id, r.user_id, r.bean, r.region, r.roaster, r.roastdate, r.postdate, r.dose, r.yield, r.time, r.grind, r.grind, r.machine, r.tastingnotes, r.notes, r.roast, r.process, l.user_id` : `R.id`}`;

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

            //req.serverTiming.from('db');
            var recipes = await pool.query(queryStr);
            //req.serverTiming.to('db');
        }
        // -- end -- req.serverTiming.to('api');
        res.send(recipes.rowCount === 0? [{"count": 0}] : recipes.rows);
    }
    catch(error){
        console.log(error.name, error.message);
        res.send({"message":"Query failed", "success": false})
    }
})

// get single recipe based on param id
router.get('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
        res.send(recipe.rows);
    }
    catch(error){
        console.log(error.name, error.message);
        res.send([null])
    }
})

// add new recipe 
router.post('/new', blacklistCheck, async(req, res) => {
    try {
        // validate data
        const recipe = req.body;
        const validData = await recipeSchema.validateAsync(recipe);
        validData.userId = await validData.userId.replace(/_/g, '-'); // humpty dumpty the token
          
        // validate user
        const token = jwtDecoder(req.headers.authorization);
        if(token.user.id !== validData.userId){
            throw new Error('Incorrect user attempting to submit another users recipe');
        }
        // insert into DB
        const addRecipe = await pool.query("INSERT INTO recipes(user_id, bean, region, roaster, roastDate, dose, yield, time, grind, grinder, machine, tastingNotes, notes, roast, process) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *", [validData.userId, validData.bean, validData.region, validData.roaster, validData.roastDate, validData.dose, validData.yield, validData.time, validData.grind, validData.grinder, validData.machine, validData.tastingNotes, validData.notes, validData.roast, validData.process]);
        if(addRecipe.rowCount !== 1){
            throw new Error('Failed to submit');
        }
        // OK
        res.send({"success": true, "message": "Recipe submited!"});

    } catch (error) {
        console.log(error.name, error.message);
        res.status(500).send({"success": false, "message": "Failed to submit"});
    }
})



// -- like routes -- //



// get number of likes on a recipe
router.post('/likes', async(req, res) => {
    try{
        const {id} = req.body;
        const recipes = await pool.query("SELECT COUNT(*) FROM likes WHERE recipe_id = $1", [id]);
        res.send(recipes.rows[0].count);
    }
    catch (error) {
        console.log(error.name, error.message);
        res.status(500);
    }
})

// likes for each recipe in array
router.post('/all-likes', async(req, res) => {
    try{
        const ids = req.body;
        const recipes = await pool.query(
            `SELECT L.recipe_id AS id, COUNT(L.recipe_id) AS likes
         FROM unnest(ARRAY[${ids.map(x => `'${x}'`)}]) idFromArray
         INNER JOIN likes AS L on CAST(L.recipe_id AS TEXT) = CAST(idFromArray AS TEXT)
         GROUP BY L.recipe_id`);

        res.send(recipes.rows);
    }
    catch (error) {
        console.log(error.name, error.message);
        res.status(500);
    }
})

// like a recipe
router.post('/like', blacklistCheck, async(req, res) => {
    try{
        const {user_id, recipe_id} = req.body;
        
        const isLiked = await pool.query("SELECT * FROM likes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);
        
        if(isLiked.rowCount === 0){
            await pool.query("INSERT INTO likes(user_id, recipe_id) VALUES($1, $2) RETURNING *", [user_id, recipe_id]);
            return res.json({"bool": true});
        }
        else{
            await pool.query("DELETE FROM likes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);
            return res.json({"bool": false});
        }
    }
    catch (error) {
        console.log(error.name, error.message);
        res.status(500);
    }
})

// check if a recipe is liked by user
router.post('/liked', blacklistCheck, async(req, res) => {
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
        console.log(error.name, error.message);
        res.status(500);
    }
})


// -- Reports -- //


router.post('/report', async(req, res) => {
    try {
        const {recipe_id, user_id} = req.body;
        
        Joi.assert(user_id, Joi.string().guid());
        Joi.assert(recipe_id, Joi.string().guid());

        const isReported = await pool.query("SELECT users FROM reports WHERE recipe_id = $1", [recipe_id]); // check reports array
        
        if(isReported?.rows[0]?.users.includes(user_id) && isReported?.rowCount !== 0){
            return res.status(418).send({"message": "Already reported!", "success": false})
        }

        const query = `INSERT INTO reports (recipe_id, users)
        VALUES($1::uuid, ARRAY[$2::uuid]) 
        ON CONFLICT (recipe_id)
        DO UPDATE SET count = reports.count + 1, users = array_append(reports.users, $2::uuid)`;
        
        const report = await pool.query(query, [recipe_id, user_id]); // if not reported by user, add to reports
        if (!report){
            return res.status(418).send({"message": "Not Reported", "success": false})
        }

        return res.status(200).send({"message": "Reported!", "success": true})

    } catch (error) {
        console.log(error.name, error.message);
        return res.status(500).send({"message": "Not reported", "success": false})
    }
})

module.exports = router;
