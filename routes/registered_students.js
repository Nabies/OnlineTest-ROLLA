const { request } = require('express')
const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/all', async function (req, res) {
    try {
        const results = await db.query('SELECT * FROM registered_students')
        return res.json(results.rows)
    } catch (err) {
        return res.send(err.message)
    }
})

router.post('/testTimes/:times_taken/:testId', async function (req, res) {
    try {
        const results = await db.query(`UPDATE registered_students SET times_taken=$1 WHERE test_id=$2 RETURNING *`,
            [req.params.times_taken, req.params.testId]
        )
        return res.json(results.rows)
    } catch (err) {
        console.log(err.message)
        return res.send(err.message)
    }
})

router.post('/checkTime/:time/:testId', async function (req, res) {
    try {
        const results = await db.query(`UPDATE registered_students SET date_time=$1 WHERE test_id=$2 RETURNING *`,
            [req.params.time, req.params.testId]
        )
        return res.json(results.rows)
    } catch (err) {
        return res.send(err.message)
    }
})

module.exports = router