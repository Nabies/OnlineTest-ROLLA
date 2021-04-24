const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/', async function (req, res) {
  try {
    const results = await db.query('SELECT * FROM questions')
    return res.json(results.rows)
  } catch (err) {
    return res.send(err.message)
  }
})

module.exports = router