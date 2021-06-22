const router = require('express').Router();
const pool = require('../../db');


// routes
router.post('/', async(req, res) => {
    console.log('shots');
    try{
        const {journal_id} = req.body;
        console.log(journal_id);
        const shots = await pool.query("SELECT * FROM shots WHERE journal_id = $1", [journal_id]);
        console.log(shots.rows)
        res.send(shots.rows);
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;
