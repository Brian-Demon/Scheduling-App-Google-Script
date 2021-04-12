function editReportEmails() {
  let sheet = ssData.getSheetByName(reportEmailsSheet);
  let ui = SpreadsheetApp.getUi();
  getReportEmails();
  if( reportEmails.length === 0 ) return;
  let emailString = "Emails currently on file:\r\n\r\n";
  for( let i = 0; i < reportEmails.length; i++ ){
    emailString += reportEmails[i] + "\r\n";
  }
  emailString += "\r\nAdd a new email below or type out an existing one to remove it:\r\n";
  let response = ui.prompt("Scheduling Report Emails:", emailString, ui.ButtonSet.OK_CANCEL);
  if( response.getSelectedButton() !== ui.Button.OK ) return;
  let email = response.getResponseText();
  if( reportEmails.indexOf(email) > -1 ){
    removeReportEmail(email);
    return;
  } else {
    try {
      MailApp.sendEmail(email, "BHB Scheduling App Email Confirmation", 'This email serves as confirmation that your email address is valid and allowed to be added to the reports email chain for Beerhead Bar & Eatery.\r\n\r\nIf you feel this was done in error, please reply with "STOP"\r\n\r\n\r\nCheers,\r\n\r\nBeerhead Scheduling-bot');
    } catch(e) {
      Logger.log(e);
      console.log(e);
      ui.alert("Error:", e, ui.ButtonSet.OK);
      return;
    }
    let nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1).setValue(email);
    ss.toast(email + " added to the reports email list.");
  }
}
