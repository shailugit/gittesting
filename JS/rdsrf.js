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
        var opco = document.getElementById('inputState');
        var aptid = document.getElementById('aptid');
        
        if (opco.value.length<3)
        {
         //swal("Error!", "invalid opco" , "error");  
         SetError('Invalid opco, please select valid opco number.');          
          return false;
         }
        if (aptid.value.length<2)
        {
          SetError('Invalid appointment id, please enter valid appointment id.');
          return false;
       }
        else
        {      
          SendData(opco.value, aptid.value);
        }
     } 

 const SendData =(opco,aptid)=>{
 var d2 = new Date();
  
  fetch(`http://njomsgwd09:84/api/Rds/rds-v1/${opco}/${aptid}`)  
  .then(response => response.json())
  .then(data => {
	  console.log(data);	
    console.log(data.apptid);	
    if (data.apptid==aptid)
      location.href =`RegisterVechicle.html?opco=${opco}&appid=${aptid}`; 
    else
    { 
      SetError('No matching appointment id found, please enter valid appointment id.');
    }
	  })
  .catch((error) => {
    //swal("Error!", `SYstem error ${error}` , "error");   
    SetError(`System error ${error}`);     
  })
  }