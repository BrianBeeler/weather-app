

let zipregex = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$')


// let testBool = false;

// while (!testBool) {
//     let zip = prompt("Enter a zipcode.")
//     testBool = zipregex.test(zip);
// }


let apiKey = 'AIzaSyCjMyqGYb-YhkqgRejHSGC1oIAX7Oxkcjs';

//new google.maps.places.Autocomplete(document.querySelector("#autocomplete"), options);

$(function() {

    console.log("Triggered");
    // IMPORTANT: Fill in your client key
    var clientKey = "uIiN6JEncIkxyjKZfYIyVCJ0ycJXmcJAtcPeBRcaCdToVtm8YYm6CvcTXRld1tbo";
    
    var cache = {};
    var container = $("#example1");
    var errorDiv = container.find("div.text-error");
    
    /** Handle successful response */
    function handleResp(data)
    {
        // Check for error
        if (data.error_msg)
            errorDiv.text(data.error_msg);
        else if ("city" in data)
        {
            // Set city and state
            container.find("input[name='city']").val(data.city);
            container.find("input[name='state']").val(data.state);
        }
    }
    
    // Set up event handlers
    container.find("input[name='zipcode']").on("keyup change", function() {

        console.log("keyup");

        // Get zip code
        var zipcode = $(this).val().substring(0, 5);
        if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
        {
            // Clear error
            errorDiv.empty();
            
            // Check cache
            if (zipcode in cache)
            {
                handleResp(cache[zipcode]);
            }
            else
            {
                // Build url
                var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
                
                // Make AJAX request
                $.ajax({
                    "url": "http://localhost:8080/api/external/location/"+zipcode,
                    "dataType": "json",
                    "type": "GET"
                }).done(function(data) {
                    console.log("data", data);
                    handleResp(data);
                    
                    // Store in cache
                    cache[zipcode] = data;
                }).fail(function(data) {
                    if (data.responseText && (json = $.parseJSON(data.responseText)))
                    {
                        // Store in cache
                        cache[zipcode] = json;
                        
                        // Check for error
                        if (json.error_msg)
                            errorDiv.text(json.error_msg);
                    }
                    else
                        errorDiv.text('Request failed.');
                });
            }
        }
    }).trigger("change");
});