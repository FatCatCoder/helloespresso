const router = require('express').Router();
const pool = require('../../db');


// routes
router.post('/', async(req, res) => {
    try{
        const {user_id} = req.body;
        const journals = await pool.query("SELECT * FROM journals WHERE user_id = $1", [user_id]);
        res.send(journals.rows);
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;
