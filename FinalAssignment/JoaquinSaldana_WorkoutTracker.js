/*
Student: Joaquin Saldana 
Final Assignment / Workout Tracker 
Description: this file, JoaquinSaldana_WorkoutTracker.js, is the server side Javascript file 
that will serve the data to the user using handlebars.  

This will have several sever side app. handlers that include helping 

*/


/*
Routine declarations that include all of the necessary modules 
*/ 

var express = require('express');

var mysql = require('./dbcon.js');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', 6839);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

var request = require('request');

app.use(express.static('public'));


/* HANDLERS */ 

/*
This function will reset the table and will create the necessary 
field to create the sql table 
*/

app.get('/reset-table', function(req, res, next) 
{
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err) 
    { 
        var createString = "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        
        mysql.pool.query(createString, function(err) 
        {
            context.results = "Table reset";
            res.render('home', context);
        }); // end of the mysql.pool.query createstring 

    }); // end of the mysql.poo.query(table if exists) function 

}); // end of app.get handler function for /reset-table 


/*
Function returns all of the data in the sql table 
*/

app.get('/', function(req, res, next) 
{
    var context = {};
    
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) 
    {
        if (err) 
        {
            next(err);
            return;
        }
        
        context.results = JSON.stringify(rows);
        
        res.render('home');
    
    }); // end of the pool.query "SELECT" function 

}); // end of the app.get handler function for "/"


/*
.get handler will return the data as a JSON string 
*/ 
app.get('/get', function(req, res) 
{
    var context = {};

    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) 
    {
        
        if (err) 
        {
            next(err);
            return;
        }
    
        context.results = JSON.stringify(rows);
    
        res.send(context.results);
    
    }); // end of the "SELECT" function for the pool.query 

}); // end of the app.get handler 



/*
Adds a new row when a request is received as a POST and sends the data 
as a JSON object 
*/ 

app.post('/add', function(req, res) 
{
    var context = {};

    var post = 
    {
        name: req.body.name,
        reps: req.body.reps,
        weight: req.body.weight,
        date: req.body.date,
        lbs: req.body.lbs

    }; // end of JSON object 

    
    mysql.pool.query('INSERT INTO workouts SET ?', post, function(err, results) 
    {
            if (err) 
            {
                next(err);
                return;
            }
            
            mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) 
            {
            
                if (err) 
                {
                    next(err);
                    return;
                }
            
                context.results = JSON.stringify(rows);
            
                res.send(context.results);
            
            }); // end of the "SELECT FROM " query function 
        
    }); // end of the pool.query "INSERT" function  

}); // end of the .post handler for "add"


/*
app.post handler for deleting a row from the table 
*/

app.post('/delete', function(req, res) 
{
    var context = {};

    mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result) 
    {
        if (err) 
        {
            next(err);
            return;
        }
        
        mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) 
        {
            if (err) 
            {
                next(err);
                return;
            }
            
            context.results = JSON.stringify(rows);
            
            res.send(context.results);

        }); // end of "SELECT" function 
    
    }); // end of "DELETE FROM" function 

}); // end of .post handler for "delete"


/*
This handler will take the user to the page where they can update the  data and it will pre-populate the 
data into the fields.  
*/

app.get('/updateForm', function(req, res, next) 
{
    var context = {};

    // select the row that contains the "hidden" id 

    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields) 
    {
        if (err) 
        {
            next(err);
            return;
        }
        
        // pass the row data to the results variable 
        // so it can populate the "update-form" page 

        context.results = rows;

        
        if (context.results[0].lbs === 1) 
        {
            context.checked = "checked";
        }
        
        // render the page 
        
        res.render('updateForm', context);
    
    }); // end of the mysql.pool.query "SELECT"

}); // end of the "update" handler 

/* 
This handler is called once the client has completed updating the excercise form and will redirect the 
user to the the "/" page 
*/ 
app.post('/updateForm', function(req, res, next) 
{
    var context = {};

    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.body.id], function(err, result) 
    {
        
        if (err) 
        {
            next(err);
            return;
        }
        
        if (result.length == 1) 
        {
            var curVals = result[0];

            var checked = 0;
            
            if(req.body.lbs)
            {
              checked = 1;
            }
            
            mysql.pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?', [req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, checked, req.body.id],function(err, result) 
            {
                    if (err) 
                    {
                        next(err);
                        return;
                    }
                    
                    res.redirect('/');
            
            }); // end of "update"
        
        } // end of IF statement 
    
    }); // end of "select" query 

}); // end of .post handler 



/*
Error handling handlers 
*/ 

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

/*
Function that logs to console the port being used and how to terminate the session 
*/

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
