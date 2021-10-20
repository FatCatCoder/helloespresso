const router = require('express').Router();
const pool = require('../../db');
const blacklistCheck = require('../utils/blacklist');


// get all shots for a journal
router.post('/', blacklistCheck, async(req, res) => {
    console.log('shots');
    try{
        const {journal_id} = req.body;
        
        const shots = await pool.query("SELECT * FROM shots WHERE journal_id = $1", [journal_id]);
    
        res.send(shots.rows);
    }
    catch(error){
        console.log(error.name, error.message);
    }
})

module.exports = router;
