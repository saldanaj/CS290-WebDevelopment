/*
Student: Joaquin Saldana 
Week 7 Assignment - Random Number Generator 
Description: this is the .js file that will use the main template, plus the 
randomPage handlebar, to display a random number.  

We will running this with the forever script.  
*/ 

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9328);

function getRandomInt(min, max) {
  var content = {}
  content.rNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return content;
}

app.get('/', function(req, res){
  var randomNumber = getRandomInt(0,1000);
  console.log(randomNumber.rNumber);
  res.render('randomPage', randomNumber);
})


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});