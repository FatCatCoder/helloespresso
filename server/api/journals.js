const router = require('express').Router();
const pool = require('../../db');
const format = require('pg-format');
const jwtValidate = require('express-jwt');
const blacklistCheck = require('../utils/blacklist');

const redis = require("redis");
const redisClient = redis.createClient();
require('dotenv').config({ path: '../../.env' })


//  -- routes -- //

// get all journals
router.post('/', blacklistCheck, jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), async(req, res) => {
    try{
        const {user_id} = req.body;
        console.log(user_id);
        const journals = await pool.query("SELECT * FROM journals WHERE user_id = $1 ORDER BY postdate DESC, posttime DESC", [user_id]);
        res.send(journals.rows);
    }
    catch(error){
        console.log({"success": false, "message": "nothing here!"})
    }
})

// add to journal
router.post('/new', blacklistCheck, jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), async(req, res) => {
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
        res.send({"success": false, "message": "Journal has not been logged!"})
    }
})

// delete a journal
router.post('/delete', blacklistCheck, jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), async(req, res) => {
    try{
        const {id} = req.body;

        const journalDelete = await pool.query("DELETE FROM journals WHERE id = $1", [id]);

        console.log('deleted!');
        res.send({"message": "deleted!", "success": true});
    }
    catch(error){
        console.log(error)
        res.send({"message": 'spilled coffee on the server, might take a while', "success": false});
    }
})

module.exports = router;
