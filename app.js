const express = require('express')
const app = express()
const port = parseInt(process.env.PORT, 10) || 3000
const path = require('path')
const db = require('./db/index.js')
const bodyParser = require('body-parser')

var cors = require('cors')
app.use(cors())

const questionRoutes = require('./routes/questions')
const studentRoutes = require('./routes/test_details')
const registeredStudentsRoutes = require('./routes/registered_students.js')

app.use( express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(__dirname + '/views'));

app.get('/', async function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
})

app.get('/sample', async function (req, res) {
  return res.sendFile(__dirname + '/views/sample.html');
})

app.use('/questions', questionRoutes)
app.use('/test_details', studentRoutes)
app.use('/registeredStudents', registeredStudentsRoutes)

// port
app.listen(port, () => {
  console.log('App is running on port ' + port)
})
