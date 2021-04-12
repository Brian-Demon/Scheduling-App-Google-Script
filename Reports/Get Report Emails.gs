function getReportEmails() {
  let sheet = ssData.getSheetByName(reportEmailsSheet);
  if( !sheet ) return;
  let lastRow = sheet.getLastRow();
  if( lastRow < 1 || !lastRow ) getError("There are no emails on file yet.\r\n\r\nAdd email with Beerhead Menu->Scheduling Options->Reports Options->Edit Report Emails.");
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === "" ) continue;
    reportEmails.push(value);
  }
//  Logger.log(reportEmails.toString());
}
