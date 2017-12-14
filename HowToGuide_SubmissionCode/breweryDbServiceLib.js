var BreweryDb = require('brewerydb-node');

var brewdb = new BreweryDb('####');

brewdb.beer.find({ name: "Newcastle Brown Ale"}, function (err, data){

	var results = []; 

	results = data; 

	console.log(results[0].name);

}); 