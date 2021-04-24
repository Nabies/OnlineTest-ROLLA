const { request } = require('express')
const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/all', async function (req, res) {
  try {
    const results = await db.query('SELECT * FROM test_details')
    return res.json(results.rows)
  } catch (err) {
    return res.send(err.message)
  }
})

router.post('/data/:testId/:attNo/:unattNo/:flgNo/:nosWrong/:nosRight/:scorePercent', async function (req, res) {
  try {
    const results = await db.query('INSERT INTO test_details (test_id, attempted, unattempted, flagged, wrong_answers, correct_answers, score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [req.params.testId, req.params.attNo, req.params.unattNo, req.params.flgNo, req.params.nosWrong, req.params.nosRight, req.params.scorePercent]
        //[req.body.testId, req.body.attNo, req.body.unattNo, req.body.flgNo, req.body.scorePercent]
    )
    console.log('sent!');
    return res.json(results.rows)
  } catch (err) {
    console.log(req.params.testId + req.params.attNo + req.params.unattNo + req.params.flgNo + req.params.scorePercent + req.params.nosWrong + req.params.nosRight)
    return res.send(err.message)
  }
})

module.exports = router