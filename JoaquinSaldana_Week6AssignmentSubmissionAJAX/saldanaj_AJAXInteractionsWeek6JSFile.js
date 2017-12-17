/* 
 * Student: Joaquin Saldana 
 * Date: 02/19/2017
 * 
 * Description: this is the JavaScript file for the 
 * AJAX activity which requires use to send a form 
 * to the Open Weather Map using their API and the 2nd function 
 * will do a new HTTP request "Post" to the HTTPBIN.org 
 */

document.addEventListener('DOMContentLoaded', bindButtons); 

// Personal API key 
var apiKey = 'b651d0a81ad885c0790a7d9d81805826';

// Global variable which has to be included in either city or zipcode usage 
var countryCode = ',us'; 

function bindButtons()
{
    /*
     * The eventListener is specific to the Open Weather Map and the "Get" request
     */
    
    document.getElementById('submitWeather').addEventListener('click', function(event)
    {  
        var zipEntered = document.getElementById("ZipCode").value; 
        var cityEntered = document.getElementById("CityName").value;
        var weatherURL = "http://api.openweathermap.org/data/2.5/weather?";
        var formInput; 
        
        // If variable zipEntered is an empty char/string then it means the user 
        // did not enter any values and as a result they elected to enter the 
        // the city information so we will concatenate the string as such 
        // In the else statement, it's concatenating the zip code 
        if (zipEntered === '') 
        {
            formInput = "q=" + cityEntered;
        } 
        else 
        {
            formInput = "zip=" + zipEntered;
        }
  
        // Code is similar as presented in the modules 
        var req = new XMLHttpRequest(); 
        var completeURL = weatherURL+formInput+'&appid='+apiKey+'&units=imperial' 
        req.open('GET', completeURL, true); 
        req.addEventListener('load', function()
        {
            if(req.status >= 200 && req.status < 400)
            {
                var response = JSON.parse(req.responseText); 
                document.getElementById('City').textContent = response.name;
                document.getElementById('Temperature').textContent = response.main.temp;
                document.getElementById('Humidity').textContent = response.main.humidity;
            }
            else 
            {
                console.log("Error in network request: " + req.statusText); 
            }      
        });
        req.send(null); 
        event.preventDefault(); 
    }); // End of Submit Weather eventListener and closure function 
    
    
    
    /*
     * Following functions is related to the HTTPBIN.org "POST" request 
     */
    
    document.getElementById('submitPost').addEventListener('click', function(event)
    {
        var httpBinUrl = "http://httpbin.org/post";
        
        var payload = {
			'First_Name': null,
			'Last_Name': null,
                      }; // End of payload variable 
        
        var request = new XMLHttpRequest();

        payload.First_Name = document.getElementById('firstName').value;
        payload.Last_Name = document.getElementById('lastName').value; 
        
        request.open("POST", httpBinUrl, true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', function() 
        {
            if (request.status >= 200 && request.status < 400) 
            {
                var response = JSON.parse(JSON.parse(request.responseText).data);
		console.log(response);
                document.getElementById('binPostContent').textContent = response.First_Name + " " + response.Last_Name;
            } 
            else 
            {
		console.log("Error in network request: " + response.statusText);
            }
	}); // End of closure function 

        request.send(JSON.stringify(payload));
        event.preventDefault(); 
        
    });  // End of eventListener for binPost 
    
} // End of bindButtons() function


