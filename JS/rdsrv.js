const form = document.getElementById("f1");
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  validateForm();
})
 const validateForm=()=> { 
        var opco = document.getElementById('driver');
        var aptid = document.getElementById('driver');
        var driver = document.getElementById('driver');
        var company = document.getElementById('company');

        if (opco.value.length<3)
        {
         //swal("Error!", "invalid opco" , "error");  
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
         toastr.error('Invalid opco, please select valid opco number.', 'Error!')           
          return false;
         }
        if (aptid.value.length<2)
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
          toastr.error('Invalid appointment id, please enter valid appointment id.', 'Error!') 
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
      toastr.error('No matching appointment id found, please enter valid appointment id.', 'Alert!') 
    }
	  })
  .catch((error) => {
    //swal("Error!", `SYstem error ${error}` , "error");   
    toastr.error(`System error ${error}`, 'System Error!')     
  })
  }