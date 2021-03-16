

let zipregex = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$')


let testBool = false;

while (!testBool) {
    let zip = prompt("Enter a zipcode.")
    testBool = zipregex.test(zip);
    debugger;
}


let apiKey = 'AIzaSyCjMyqGYb-YhkqgRejHSGC1oIAX7Oxkcjs';

//new google.maps.places.Autocomplete(document.querySelector("#autocomplete"), options);
