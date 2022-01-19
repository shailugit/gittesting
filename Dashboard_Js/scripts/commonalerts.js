function SetAlert(message,icon)
{
    swal({
    title: "Alert",
    text: message,
    icon: icon,  
    })  
}
function SetAlertRedirect(message,icon,pagename)
{
      swal({
      title: "Completed",
      text: message,
      icon: icon,  
      }).then((okay) => {
      if (okay)  {
      window.location.href =pagename;
      }
      });  
}
export { SetAlert, SetAlertRedirect };