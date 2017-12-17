/*
Student: Joaquin Saldana 
Week 7 Assignment - Get/Post .js File 
Description: this is the .js file that will be used with the post and 
get checker that will implement the main template, and render the 
get or post handlebar.   
*/ 


var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 9329);


/*
this is the .get function of the getPost
This will display to the user if a get request is 
received with the query string in the URL.  

This will use the main template with the getPage 
handlebar 
*/ 

app.get('/getPost',function(req,res)
{

  var getParameters = [];
  
  for (var p in req.query)
  {
    getParameters.push({"name":p,"value":req.query[p]});
  }
  
  var context = {};

  context.contentType = "GET";
  
  context.reqList = getParameters;
  
  res.render('getPage',context);

});

/*
this is the .post function of the getPost
This will display to the user if a get request is 
received with the query string in the URL or the 
data sent via the raw headers in the ARC client 

This will use the main template with the getPage 
handlebar 
*/ 

app.post('/getPost', function(req,res)
{
  
  var postParameters = [];
  
  for (var p in req.query)
  {
    postParameters.push({"name":p,"value":req.query[p]});
  }

  var postBodyParameters = [];

  for (var p in req.body)
  {
    postBodyParameters.push({"name":p, "value":req.body[p]});
  }

  var context = {};
  
  context.reqList = postParameters;
  
  context.reqBody = postBodyParameters;
  
  context.contentType = "POST";
  
  res.render('postPage',context);

})

/*
Basic templates for the 404 and 505 errors 
*/

app.use(function(req,res)
{
  
  res.status(404);
  
  res.render('404');

});

app.use(function(err, req, res, next)
{
  
  console.error(err.stack);
  
  res.type('plain/text');
  
  res.status(500);
  
  res.render('500');

});


app.listen(app.get('port'), function()
{
  
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');

});