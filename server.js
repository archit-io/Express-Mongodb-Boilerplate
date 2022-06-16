const express = require('express');
const bodyParser = require('body-parser') //server can now read data from the form that posts to it
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const app = express();

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) //server will now be able to read JSON objects
app.use(express.static('public')) //public folder made accessible

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

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(/* ... */)
  })

  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      quotesCollection.findOneAndUpdate(
        { name: 'john' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )        
    )
      .then(result => {
        console.log(result)
       })
      .catch(error => console.error(error))
  })
})

app.listen(3000, function() {
    console.log('listening on 3000')
  })
