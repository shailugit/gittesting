const form = document.getElementById("f1");
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  validateForm();
})
function SetError(message)
{
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "15",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  toastr.error(message, 'Error!');

}
 const validateForm=()=> { 
        var opco = document.getElementById('inputopco');
        var userid = document.getElementById('uid');
        
        if (opco.value.length<3)
        {
         SetError('Invalid opco, please select valid opco number.');          
          return false;
         }
        if (userid.value.length<3)
        {
          SetError('Invalid user id, please enter valid user id.');
          return false;
       }
        else
        {   
          localStorage.setItem('uid',userid.value);
          localStorage.setItem('opco',opco.value);   
          location.href =`PlinkReports.html`; 
          //SendData(opco.value, userid.value);
        }
     } 

 const SendData =(opco,userid)=>{
 var d2 = new Date();
  //validate plink user
  fetch(`http://njomsgwd09/RdsApiNet/api/Rtlx/ValidateAppointment/rds-v1/${opco}/${aptid}`)  
  .then(response => response.json())
  .then(data => {
	  console.log(data);	
    console.log(data.apptid);	
    localStorage.setItem('uid',userid);
    localStorage.setItem('opco',opco);
    if (data.apptid==aptid)     
      location.href =`RegisterVechicle.html`; 
    else
    { 
      SetError('No matching user id found, please enter valid user id.');
    }
	  })
  .catch((error) => {    
    SetError(`System error ${error}`);     
  })
  }

 
  let dropdown = document.getElementById('inputState');
  dropdown.length = 0;
  
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Select OpCo.. .';
  
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  
  const url = 'http://njomsgwd09/RdsApiNet/api/Rtlx/LoadOpCo/rds-v1';
  
  fetch(url)  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem with API. Status Code: ' + 
            response.status);  
          return;  
        }
        localStorage.removeItem('aptid');
        localStorage.removeItem('opco');
        // Examine the text in the response  
        response.json().then(function(data) {  
          let option;
      
        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].warehousecode;
            option.value = data[i].opco;
            dropdown.add(option);
        }    
        });  
      }  
    )  
    .catch(function(err) {  
      console.error('Fetch Error -', err);  
    });
  