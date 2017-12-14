/*
Student: Joaquin Saldana 
Final Assignment / Workout Tracker 
Description: javascript file will wait for the page to load and will act as the 
event listener for the "Add New Workout" submission with the form 

This function will perform an XMLHttpRequest to add the data to the table as a 
row 
*/


document.addEventListener('DOMContentLoaded', bindRows);

function bindRows() 
{
    // eventlistener in case the user wants to add a row to the table 
    document.getElementById("add").addEventListener('click', function(event) 
    {

        // alert the user if the required field of name is not populated 
        if (!document.getElementById("workoutName").value)
        {
            
            alert("Please enter a name!");
            
            event.preventDefault();
            
            return;
        }

        // getting ready to do the AJAX call if the user decides to add data to the table 
        var req = new XMLHttpRequest();

        var checked = 0;
        
        if (document.getElementById("unitCheckBox").checked) 
        {
            checked = 1;
        }

        // JSON format the data we are going to send in our AJAX call

        var payload = 
        {
        
            name: document.getElementById("workoutName").value,
        
            reps: document.getElementById("workoutReps").value,
        
            weight: document.getElementById("workoutWeight").value,
        
            date: document.getElementById("workoutDate").value,
        
            lbs: checked
        
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:6839/add');
        
        req.setRequestHeader('Content-Type', 'application/json');
        
        // if the call is successful thne we 
        req.addEventListener('load', function() 
        {
            if (req.status >= 200 && req.status < 400) 
            {
                var response = JSON.parse(req.responseText);

                if (response.length) 
                {
                    // if the row already exists and we need to "update"/replace the data 
                    if (document.getElementById("exercise")) 
                    {
                        var curTable = document.getElementById("exercise");
                    
                        curTable.parentNode.replaceChild(createTable(response), curTable);
                    } 
                    else 
                    {   
                        // else create a new child to the table 
                        document.body.appendChild(createTable(response));
                    }
                }
            } 
            else 
            {
                console.log("Error in network request: " + req.statusText);
            }
        
        });
        
        req.send(JSON.stringify(payload)); 
        
        event.preventDefault();
    
    });

}
