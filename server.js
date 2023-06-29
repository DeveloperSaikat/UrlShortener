const express = require('express');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
const app = express();

const MongoDBUri = '#'
mongoose.connect(MongoDBUri, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const allUrls = await shortUrl.find()
    res.render('index', {allUrls: allUrls});   
});

app.post('/shortUrl', async (req, res) => {
    await shortUrl.create({ original: req.body.originalUrl })
    res.redirect('/');
});

app.get('/:inputUrl', async (req, res) => {
    const retrievedUrl = await shortUrl.findOne({ short: req.params.inputUrl});
    if (retrievedUrl === null) return res.sendStatus(404)
    res.redirect(retrievedUrl.original); 
})

app.listen(process.env.POST || 5000);
