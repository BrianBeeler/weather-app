$("#first-button").click(function(){
    console.log("clicked");

});

console.log("loaded")

$.get("http://localhost:8080", function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
});