

let zipcode = prompt('Choose a 5 digit zip code to search the weather.')
let zipPattern = new  RegExp('^[0-9]{5}$');
let validZip = zipPattern.test(zipcode);

if (validZip) {
    getLocationByZip(zipcode, (data)=>{

        console.log("Data", data);
        // Success flow
        
        // disaplay location data
        // ask if correct
        // render check whether and try again buttons

    }, (error) => {
        console.log("Error")
        // render: there was an error
        // render: try again button

    })

} else {
    console.log("Invalid zip");
    // render improper zipcode message with try again button
}




