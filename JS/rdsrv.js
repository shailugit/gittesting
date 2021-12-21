const form = document.getElementById("f2");
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
    "showDuration": "300",
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

function SetAlert1(message)
{
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "hideMethod": "fadeOut"
  }
  toastr.success(message, 'Done!');
  $("#f2")[0].reset();
}


function SetAlert(message)
{
  localStorage.removeItem('aptid');
  localStorage.removeItem('opco');
  swal({
  title: "Completed",
  text: message,
  icon: "success",  
})
.then((willDelete) => {
  window.location.href =`RegisterForm.html`;
});
  $("#f2")[0].reset();
}

 const validateForm=()=> {   
  /*      
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var opco = urlParams.get('opco');
  var aptid = urlParams.get('appid');
  */
  var aptid= localStorage.getItem('aptid');
  var opco= localStorage.getItem('opco');
  console.log(aptid);
 
  var company = document.getElementById('company');
  var driver = document.getElementById('driver');
      
        if (opco==null || opco.length<3)
        {
          SetError('Invalid session, please select valid opco.');          
          return false;
         }
        if (aptid==null|| aptid.length<2)
        {
          SetError('Invalid appointment id, please enter valid appointment id.');
          return false;
        }
        else
        {      
          SendData(opco, aptid, company.value,driver.value);
        }
     } 

 const SendData =(opco,aptid, company,driver)=>{
 var d2 = new Date();
 var phone = document.getElementById('phone');
  var state = document.getElementById('state');
  var plate = document.getElementById('plate');
  var vin = document.getElementById('vin');
  var dot = document.getElementById('dot');
  var vclass = document.getElementById('vclass');
  var fueltype = document.getElementById('fueltype');

  let frmdata = {
    "id": 0,
    "apptid": aptid,
    "opco": opco,
    "driver": driver,
    "company": company,
    "mobile": phone.value,
    "state": state.value,
    "plateno": plate.value,
    "vin": vin.value,
    "dot": dot.value,
    "vechicleclass": vclass.value,
    "fueltype": fueltype.value,
    "credat": d2,
    "upddat": d2,
    "creusr": "testusr",
    "updusr": "updusr",
    "status": "NA",
    "message": "NA"
  };

fetch('http://njomsgwd09/RdsWebApi/api/Rds/SetRdsAppointment/rds-v1',
{headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(frmdata), method: 'POST'})
  .then(response => response.json())
  .then(data => {
	  console.log(data);
    if (data.message=="CREATED")
    {
    SetAlert(`Thanks for registration, your vechicle is registered with us with reference number: ${data.id}` );
    location.href =`RegisterForm.html`;   
  }
    else if (data.message=="UPDATED")
     { SetAlert(`Thanks for registration, your vechicle is updated with us with reference number: ${data.id}` );  
      location.href =`RegisterForm.html`;   
    }
      else
      SetError('Validation error occur.');
    })
  .catch((error) => {
	  SetError(`The error is ${error}`);
  })
}