function removeReportEmail(email) {
  let ui = SpreadsheetApp.getUi();
  let sheet = ssData.getSheetByName("Report Emails");
  if( reportEmails.length === 0 ) getReportEmails();
  let index = reportEmails.indexOf(email);
  if( index === -1 ) getError("Something went wrong. (err code: NO_EMAIL_FOUND_TO_REMOVE)");
  
  
  sheet.getRange(index+1, 1).setValue("");
  let lastRow = sheet.getLastRow();
  sheet.getRange(1, 1, lastRow, 1).sort({column: 1, ascending: true});
  ss.toast(email + " removed from the reports email list.");
}
