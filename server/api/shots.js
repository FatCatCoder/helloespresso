const router = require('express').Router();
const pool = require('../../db');
// const format = require('pg-format');
const blacklistCheck = require('../utils/blacklist');


// -- routes -- //

// get all shots for a journal
router.post('/', blacklistCheck, async(req, res) => {
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

// add new shots from array

// router.post('/new', blacklistCheck, async(req, res) => {
//     try {
//         const {journal_id, shotData} = req.body;
//         console.log(journal_id, shotData);

//         const valuesMap = shotData.map((x, y) => [y, journal_id, x.dose, x.yield, x.time, x.grind, x.notes])

//         const queryStr = format('INSERT INTO shots(queue, journal_id, dose, yield, time, grind, notes) VALUES %L ', valuesMap);

//         const newShot = await pool.query(queryStr);

//         console.log(newShot);
//         res.status(200).send('good shot data');

//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router;
