var uid= localStorage.getItem('uid');
var opco= localStorage.getItem('opco');
var x = document.getElementById("showhide");
console.log(uid);
if (uid===null || opco===null || uid=== undefined || opco===undefined || uid.length<3 || opco.length<3)
{    
    x.style.display = "none";    
}
else
{ 
    x.style.display = "block";
    document.getElementById("hideprofile").style.display="none";
    document.getElementById("userspan").innerHTML = `Current User: <b> ${uid} </b> </br>OpCo: <b>${opco}</b>`;
    document.getElementById("profile").innerHTML = `<b>&nbsp${uid}</b>`;
    document.getElementById("profile2").innerHTML = `<b>&nbsp${opco}</b>`;
}

function logoff()
{
    localStorage.removeItem('uid');
    localStorage.removeItem('opco');
}