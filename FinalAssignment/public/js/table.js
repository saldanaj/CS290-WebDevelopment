/*
Student: Joaquin Saldana 
Final Assignment / Workout Tracker 
Description: javascript file will create the table by using the DOM events 
*/

/*
Function creates a table and creates the table headers using the DOM events 
The function is passed the data that will be used to populate the table 
*/ 

function createTable(data) 
{
    // Create the new table element and assign it a unique id 

    var newTable = document.createElement("table");

    newTable.id = "exercise";

    // assign the array of fields to the variable fields so we can create the table 
    // headers 

    var fields = Object.keys(data[0]);
    
    var tableHeaders = document.createElement("tr");
    
    // look through to create the table headers and 
    // append each table header together 

    for (var i = 1; i < fields.length; i++) 
    {
        var headCell = document.createElement("th");
        
        headCell.textContent = fields[i];
        
        tableHeaders.appendChild(headCell);
    }
    
    // append the headers to the table element 

    newTable.appendChild(tableHeaders);

    // now were going to iterate through the data 
    // and populate the table by appending table rows 
    data.forEach(function(object) 
    {
        // create the table row element 
        var row = document.createElement("tr");

        // create the table data element and append the data 
        // to it's own td element to later append to the table 
        // row element 

        for (var i = 1; i < fields.length; i++) 
        {
            var cell = document.createElement("td");
        
            cell.textContent = object[fields[i]];
        
            row.appendChild(cell);
        }

        // create a form in the event the user wants to delete or update 
        // the row's information 

        var newForm = document.createElement("form");

        var delButton = document.createElement("button");
        
        delButton.textContent = "Delete";
        
        delButton.className = "delete";

        // AJAX call to the delete handler that will remove the data from the table 
        delButton.addEventListener('click', function(event) 
        {
        
            var req = new XMLHttpRequest();

            var rowId = delButton.parentNode.parentNode.lastChild.value;
     
            // all we need to send is the row ID 
            var payload = 
            {
                id: rowId
            };


            // AJAX call     
            req.open('POST', 'http://flip3.engr.oregonstate.edu:6839/delete');
            
            req.setRequestHeader('Content-Type', 'application/json');
            
            req.addEventListener('load', function() 
            {

                // if the call was successful, then we delete the row from the parent node 
                // which is the table
                if (req.status >= 200 && req.status < 400) 
                {
                    var curTable = document.getElementById("exercise");
                
                    var curRowIdx = delButton.parentNode.parentNode.rowIndex; 
                
                    curTable.deleteRow(curRowIdx); 
                } 
                else 
                {
                    console.log("Error in network request: " + req.statusText);
                }
            
            });
            
            req.send(JSON.stringify(payload)); 
            
            event.preventDefault();
        
        });
        
        // append the delete button 

        newForm.appendChild(delButton);

        // creating the update button and appending it to the row 
        var updateButton = document.createElement("button");
        
        updateButton.textContent = "Update";
        
        updateButton.className = "update";
        
        // assign the update button a function to make an AJAX call to the server 
        // with the row id to make changes to the row information 

        updateButton.onclick = function()
        {
            var rowId = updateButton.parentNode.parentNode.lastChild.value;
            
            location.href = "http://flip3.engr.oregonstate.edu:6839/updateForm?id="+rowId;
            
            event.preventDefault();
        };

        // append the update button to the form 
        
        newForm.appendChild(updateButton);

        // append the form to the row 
        row.appendChild(newForm);


        // Create hidden id to identify the row when the user 
        // requests to either delete or update the information on the 
        // row 

        var hiddenId = document.createElement("input");
        
        hiddenId.name = "id" + object.id;
        
        hiddenId.type = "hidden";
        
        hiddenId.value = object.id;
        
        row.appendChild(hiddenId);

        newTable.appendChild(row);
    
    });
    
    return newTable;

}


/*
AJAX Request to the /get handler of the server 
*/ 

var req = new XMLHttpRequest();

req.open('GET', 'http://flip3.engr.oregonstate.edu:6839/get');

req.setRequestHeader('Content-Type', 'application/json');

req.addEventListener('load', function() 
{
    if (req.status >= 200 && req.status < 400) 
    {
        var response = JSON.parse(req.responseText);
        
        if (response.length) 
        {
            if (document.getElementById("exercise")) 
            {
                var curTable = document.getElementById("exercise");

                curTable.parentNode.replaceChild(createTable(response), curTable);
            } 
            else 
            {
                document.body.appendChild(createTable(response));
            }
        }
    } 
    else 
    {
        console.log("Error in network request: " + req.statusText);
    }
});


req.send(null);


