const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const app = express();

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs') //setting up templating engine

const connectionString = `mongodb+srv://archit:${process.env.DB_PASSWORD}@cluster0.mrxqhgv.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('Cluster0')
  const quotesCollection = db.collection('quotes')

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/') //redirect back to the index page
      })
      .catch(error => console.error(error))
  })
})

app.listen(3000, function() {
    console.log('listening on 3000')
  })
