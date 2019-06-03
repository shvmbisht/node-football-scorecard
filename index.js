
const express = require('express');

const app = express();
const fetch = require('node-fetch');
var Request = require("request");
const bodyPsrser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyPsrser.json());
app.use('/', function(req,res,next) {
    const url = 'http://api.affixus.com/pub/home/live/5c9f4d3003d5dba159be3efd';

// fetch call to our /api
fetch(url)

  // creates promise to work with response from /api
  .then(res => {
    // throws error if there is a problem fetching page
    if (!res.ok) {

      // returns error with response text of error

      throw new Error(res.statusText);

    }

    // returns data from /api in json format to next promise

    return res.json();

  })
  .then(data => {
   if(!data.success){
       res.render('error');
   }
   var sendData = data.data;
   res.render('index', {sendData});
  });
    
});


app.listen(3000);