$("#first-button").click(function(){
    console.log("clicked");

});

console.log("loaded")

$.ajax({
    type: "POST",
    url: "http://localhost:8080/api/tutorials",
    data: {
        "title": "JS: Node Tut #1",
        "description": "Tut#1 Description" 
    },
    success: (data)=> {
        console.log("Success", data);
    }
})

$.get("http://localhost:8080/api/tutorials", (succces) => {
    console.log("Success!");
} )