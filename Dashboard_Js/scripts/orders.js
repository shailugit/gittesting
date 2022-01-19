function SetAlert(message,icon)
{
    swal({
    title: "Alert",
    text: message,
    icon: icon,  
    })  
}

const form = document.getElementById("f1");
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  validateForm();
})


const validateForm=()=> { 
  var uid= localStorage.getItem('uid');
  var opco= localStorage.getItem('opco'); 
  var strdat=document.getElementById('strdat');
  var enddat=document.getElementById('enddat');
  if (opco.length<1)
  {
    SetAlert('Invalid opco, please update your profile.','error');          
    return false;
   }
  if (uid.length<3)
  {
    SetAlert('Invalid user id, please update your profile.','error');
    return false;
  }
  else
  {      
    SendData(opco, uid, strdat.value,enddat.value);
  }
} 

const SendData =(opco,userid,strdat,enddat)=>{ 
 fetchData(opco,userid,strdat,enddat);
}

function fetchData(opco,userid,strdat,enddat)
{
  const url = `https://omsapiqa.pfgc.com/PlinkWebApi/api/Reports/GetOrders/${opco}/${userid}/${strdat}/${enddat}`;
  fetch(url)  
    .then(  
      function(response) {  
        document.getElementById('tablerow').style.display = 'block';
        if (response.status !== 200) {  
          SetAlert('Looks like there was a problem with API. Status Code: ' + 
            response.status,'error');  
          showSpinner(true);
          return;  
        }
        // Examine the text in the response  
        response.json().then(function(data) {  
				console.log("checking..");
         if (data != null && data!= undefined && data.length > 0) {          
			  console.log("populating data table...");
        showSpinner(true);
        setTimeout(function(){
        }, 60000);
		 $('#testtable').DataTable( {	
        destroy: true,      	 
				data: data,
				columns: [
        { data: 'ordtky' },
        { data: 'ordnum' },
        { data: 'shpcusnum'},
        { data: 'orddat'},
        { data: 'prislscod'},
        { data: 'ordtotamt'},
        { data: 'shpdat'},
        { data: 'cfmnum'},
        { data: 'oflgdesc'},
        { data: 'totordqty'}        		 		
    ]
		
    } );
		 }
     showSpinner(false);          
        });  
      }  
    )  
    .catch(function(err) {  
      console.error('Fetch Error -', err);  
    });
  
    function showSpinner(flag) {
      if (flag==true)
      {      document.getElementById('spinner').style.display = 'block';}
      else
      {
        document.getElementById('spinner').style.display = 'none';
      }

  } 
}

var uid= localStorage.getItem('uid');
var opco= localStorage.getItem('opco'); 
let today = new Date().toISOString().slice(0, 10);
let  yesterday =new Date();
yesterday.setDate(yesterday.getDate() - 1)
yesterday =yesterday.toISOString().slice(0, 10);
if (uid.length<3 || opco.length<3 || uid===null || opco===null || uid=== undefined || opco===undefined)
  SetAlert('Invalid opco or user id, please update your profile.','error'); 
else
{
  document.getElementById("strdat").value = yesterday;
  document.getElementById("enddat").value = today;
  document.getElementById("profile").innerHTML = `<b>&nbsp${uid}</b>`;
  document.getElementById("profile2").innerHTML = `<b>&nbsp${opco}</b>`;
}
  //fetchData(uid,opco,yesterday,today);
 function logoff()
{
    localStorage.removeItem('uid');
    localStorage.removeItem('opco');
}