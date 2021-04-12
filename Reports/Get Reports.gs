function getAvailReport(sheetName) {
  let ui = SpreadsheetApp.getUi();
  let title = 'AVAILABILITY REPORT:';
  let body = sheetName + ':\r\n\r\n';
  for( i = 0; i < availReports.length; i++ ){
    body += availReports[i];
  }
//  Logger.log(title + '\r\n' + body);
  ui.alert(title, body, ui.ButtonSet.OK);
}

function getPrefReport(sheetName) {
  let ui = SpreadsheetApp.getUi();
  let title = 'PREFERRED AVAILABILITY REPORT:';
  let body = sheetName + ':\r\n\r\n';
  for( i = 0; i < prefReports.length; i++ ){
    body += prefReports[i];
  }
//  Logger.log(title + '\r\n' + body);
  ui.alert(title, body, ui.ButtonSet.OK);
}


function getEmailReports(sheetName) {
  let subject = 'BHB: Scheduling Report for (' + sheetName + '):';
  let body = 'Greetings,\r\n\r\nThere are (' +
    availReports.length +
      ') availability issues and ('
    + prefReports.length +
      ') preferrd availability issues to be reviewed.\r\n\r\n\r\n' +
        'AVAILABILITY REPORT (' + sheetName + '):\r\n----------------------------------------------------------------------------------------------\r\n';
  for( i = 0; i < availReports.length; i++ ){
    body += availReports[i];
  }
  body += '----------------------------------------------------------------------------------------------\r\n';
  body+= '\r\n\r\nPREFERRED AVAILABILITY REPORT (' + sheetName + '):\r\n----------------------------------------------------------------------------------------------\r\n';
  for( i = 0; i < prefReports.length; i++ ){
    body += prefReports[i];
  }
  body += '----------------------------------------------------------------------------------------------\r\n';
  body += '\r\n\r\nCheers,\r\n\r\nBeerhead Scheduling-bot';
//  Logger.log(subject);
//  Logger.log('\r\n' + body);
  for( let i = 0; i < reportEmails.length; i ++ ){
    let email = reportEmails[i];
    MailApp.sendEmail(email, subject, body);
  }
}