const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const app = express();

const connectionString = `mongodb+srv://archit:${process.env.DB_PASSWORD}@cluster0.mrxqhgv.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('Cluster0')
})

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  })

// app.get('/', (req, res) => {
//     res.send('Hello World')
//   })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })

// app.post('/quotes', (req, res) => {
//     console.log('Hellooooooooooooooooo!')
//   })

app.post('/quotes', (req, res) => {
  console.log(req.body)
})