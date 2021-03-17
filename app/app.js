getLocationByZip(42721, (data)=>{
    //Success
    console.log("Success", data.lat, data.lng);

}, (data) => {
    //Failure
    console.log(data);
})