
var myVar = setInterval(myTimer, 1000);
var myVar2 = setInterval(fetch_data, 10000);

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = "Current Time: " + d.toLocaleTimeString();
}

function fetch_data(){

var d2 = new Date();
document.getElementById("last").innerHTML = "Fetch Time: " + d2.toLocaleTimeString();

fetch('http://njomsgwd09:83/api/prices/165/itemsearch?itemsearch=bread')
  .then(response => response.json())
  .then(data => {
	  console.log(data);	  
	  console.log(data[0].prdnum);
	  })
  .catch((error) => {
	  console.log(`The error is ${error}`);
  })
}

myTimer();
fetch_data();