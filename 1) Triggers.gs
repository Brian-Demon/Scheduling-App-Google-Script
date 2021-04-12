function onOpen(){
  setUpMenu();
  getSheets();
  getReportEmails();
  requestOffAlerts();
}

function triggerAutoSend(){
  if( checkAutoSend() === true ){ sendEmails(); }
}