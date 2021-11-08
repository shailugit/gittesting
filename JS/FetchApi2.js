
var myVar = setInterval(myTimer, 1000);
//var myVar2 = setInterval(fetch_data, 10000);

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = "Current Time: " + d.toLocaleTimeString();
}

function fetch_postdata(){

var d2 = new Date();
document.getElementById("last").innerHTML = "Fetch Time: " + d2.toLocaleTimeString();

fetch('http://njomsgwd09:83/api/FullSync/plink-v1/165/stiwari/testlaptop',
{headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST'})
  .then(response => response.json())
  .then(data => {
	  console.log(data);
	  })
  .catch((error) => {
	  console.log(`The error is ${error}`);
  })
}

myTimer();
fetch_postdata();