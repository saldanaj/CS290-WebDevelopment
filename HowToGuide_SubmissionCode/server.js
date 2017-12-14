/*
Student: Joaquin Saldana 
Description: this is the .js file for the middle ware server that will 
run the pages using the following tools 
- Express Node.js 
- Handlebars 
- Request Package 
- Forever NPM Package 
*/

var key = ""; 

var express = require('express');

var request = require('request'); 

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 8000); 


app.get("/getBeers", function (req, res, next)
{
	var returnValue = {}; // will hold the JSON parsed data returned by the GET call 

	var context = {};  // will hold the elements that will be passed to the handlebar template 

	var dataArray = {};  // will hold the array of data (which is what we care about) and from here we'll extract what we need

    request('http://api.brewerydb.com/v2/beers?key=' + key + '&name=NewCastle+Brown+Ale', function(error, response, body){    

        if(!error && response.statusCode >= 200 && response.statusCode < 400)
        {
                    	
            returnValue = JSON.parse(body);  // return the body of the API call to this variable, as it's parsed to JSON 

            dataArray = returnValue.data; // Remember, the API returns an array and we want the data in the .data key value

            context.beerName = dataArray[0].name; // next we want the name of the beer 

            context.information = dataArray[0].description; // we want the description of the beer 

            context.style = dataArray[0].style.name; // we want the style of the beer 

            context.styleInformation = dataArray[0].style.description; // we want the style description of the beer 

            context.beerPicture = dataArray[0].labels.large; // last, we want a picture of the lable of the beer

			res.render('findBeer', context); // render the HTML handleabar page with the data we just saved 

            console.log(dataArray); // all of this data to our console 

        }
        else 
        {
        	if(response)
        	{
        		console.log(response.statusCode); // standard error handling 
        	}

        	next(err); 
        }
         
    }); 
}); 

app.use(function(req, res)
{    
    res.status(404); 
    res.render('404');     
}); 

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500');
});


app.listen(app.get('port'), function(){
    
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');

}); 
