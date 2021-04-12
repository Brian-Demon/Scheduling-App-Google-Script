function emailReports() {
  let sheet = SpreadsheetApp.getActive().getActiveSheet();;
//  let sheet = ss.getSheetByName("Jan 11 - Jan 17");
  let sheetName = sheet.getName();
  if( isDefaultSheet(sheet) ){
    getWrongSheetErrorMsg('a scheduling');
    return;
  }
  let ui = SpreadsheetApp.getUi();
  let body = 'Are you sure you want to send the reports via email to:\r\n\r\n';
  getReportEmails();
  for( let i = 0; i < reportEmails.length; i++ ){
    body += reportEmails[i] + '\r\n';
  }
  body += '\r\n';
  let response = ui.alert("Send Reports Via Email:", body, ui.ButtonSet.YES_NO);
  if( response !== ui.Button.YES ) return;
  checkSchedule();
  getEmailReports(sheetName);
}
