const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require("body-parser")
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));


//for testing purpose.....
app.post('/test', (req, res) => {

    console.log(req.body.name);

    // fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=16561fca1cf246439faa4a503efcf7d6')
    //     .then(r => r.json())
    //     .then(re => { console.log(re); res.send(re) })
});


//for BBC news headlines ('get' request)...
app.get('/', (req, res) => {
    fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
});//......done......

//for date wise news of any particular topic...
app.post('/datewise', (req, res) => {

    const topic = req.body.topic;
    const fromdate = req.body.fromdate;
    const todate = req.body.todate;
    console.log(req.body);

    fetch(`https://newsapi.org/v2/everything?q=${topic}&from=${fromdate}&to=${todate}&sortBy=popularity&apiKey=${process.env.API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data)
        })
});//......done......

//for country wise headlines...
app.post('/countrywise', (req, res) => {

    const country = req.body.country;

    fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
});//......done......

//for topic wise headlines...
app.post('/topicwisehead', (req, res) => {

    const topic = req.body.topic;
    console.log(topic)
    fetch(`https://newsapi.org/v2/top-headlines?q=${topic}&language=en&apiKey=${process.env.API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
});//......done......



app.listen(port, () => {
    console.log('running on port', port);
});