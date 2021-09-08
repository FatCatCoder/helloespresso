const router = require('express').Router();
const pool = require('../../db');
const format = require('pg-format');


// routes
router.post('/', async(req, res) => {
    try{
        const {user_id} = req.body;
        const journals = await pool.query("SELECT * FROM journals WHERE user_id = $1 ORDER BY postdate DESC, posttime DESC", [user_id]);
        res.send(journals.rows);
    }
    catch(error){
        console.log(error)
    }
})

// add to journal
router.post('/new', async(req, res) => {
    try{
        // log journal
        const {user_id, journalData, ShotLog} = req.body;
        console.log(journalData)
        const newJournal = await pool.query("INSERT INTO journals(bean, region, roaster, user_id) VALUES($1, $2, $3, $4) RETURNING id", [journalData.bean, journalData.region, journalData.roaster, user_id]);
        console.log(newJournal.rows[0].id)

        // log shots to the journal
        const journal_id = newJournal.rows[0].id;

        const valuesMap = ShotLog.map((x, y) => [y, journal_id, x.dose, x.yield, x.time, x.grind, x.notes])

        const queryStr = format('INSERT INTO shots(queue, journal_id, dose, yield, time, grind, notes) VALUES %L ', valuesMap);

        const newShot = await pool.query(queryStr);

        res.send({"success": true, "message": "Journal has been logged!"});
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

module.exports = router;
