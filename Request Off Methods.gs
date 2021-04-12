// ******************************** //
// --  Request Off Alert Methods -- //
// ******************************** //
function requestOffAlerts(){
  let sheet = ss.getSheetByName(ROsSheetName);
  let roDates = getRODates();
  let roCounter = 0;
  let today = Utilities.formatDate(new Date(), "GMT-6", "w");
  for( let i = 0; i < roDates.length; i++ ){
    let date = Utilities.formatDate(roDates[i], "GMT-6", "w");
//    Logger.log(`@i: ${i} -- Today: ${today} // Date: ${date}`);
    if( date - today <= 2 ){
//      Logger.log(`@i: ${i} -- Shits coming up bro!`);
      let color = getColorName(sheet.getRange(i + 2, 4).getBackground());
      if( color === "WHITE" ) roCounter++;
    }
  }
  if( roCounter === 1 ){
    ss.toast("You have " + roCounter + " unresolved R/O coming up soon!");
  } else{
    ss.toast("You have " + roCounter + " unresolved R/O's coming up soon!");
  }
}

function getRODates() {
  let sheet = ss.getSheetByName(ROsSheetName);
  let lastRow = sheet.getLastRow();
  return sheet.getRange(2, 4, lastRow - 1, 1).getValues().flat();
}


// ******************************** //
// --  Request Off Email Methods -- //
// ******************************** //
function checkAutoSend(){
  let sheet = ssData.getSheetByName('Toggles');
  return sheet.getRange(autoSendRow, 2).getValue();
}


function toggleAutoSend(){
  let ui = SpreadsheetApp.getUi();
  let sheet = ssData.getSheetByName('Toggles');
  let title = 'Auto-Send Option';
  let range = sheet.getRange(autoSendRow, 2);
  let value = range.getValue();
  let first = 'ERR';
  let second = 'ERR';
  if( value == true ){ 
    first = 'ON';
    second = 'OFF';
  }
  else{
    first = 'OFF';
    second = 'ON';
  }
  let response = ui.alert(title, 'The Auto-Send Option is currently set to ' + first + '.\r\n\r\nWould you like to turn it ' + second + '?', ui.ButtonSet.YES_NO);
  switch( response ){
    case ui.Button.NO:
    case ui.Button.CLOSE:
      return;
    case ui.Button.YES:
      range.setValue(!value);
      ui.alert(title, 'Auto-Send option now set to ' + second, ui.ButtonSet.OK);
      break;
    default:
      break;
  }
}


function onlineSendEmails(){
  let pendingEmailsSheet = ssData.getSheetByName('Pending Emails');
  let lastRow = pendingEmailsSheet.getLastRow();
  // Check to see if there are no emails to send, if there are not, return
  if( lastRow === 1 ){
    emailErrorMsg();
    return;
  }
  sendEmails();
}


function sendEmails(){
  let pendingEmailsSheet = ssData.getSheetByName('Pending Emails');
  let lastRow = pendingEmailsSheet.getLastRow();
  if( lastRow == 1 ){ return; }
  // Iterate through rows to gather info for emails
  for( r = 2; r <= lastRow; r++ ){
    let email = pendingEmailsSheet.getRange(r, 2).getValue();
    let subject = pendingEmailsSheet.getRange(r, 3).getValue();
    let message = pendingEmailsSheet.getRange(r, 4).getValue();
    MailApp.sendEmail(email, subject, message);
  }
  
  // Delete all the email info (all info on 'Pending Emails' sheet (ssData)) and add rows back in to make 1,000 rows total
  let numberOfRows = lastRow - 1;
  pendingEmailsSheet.deleteRows(2, lastRow);
  let maxRow = pendingEmailsSheet.getMaxRows();
  pendingEmailsSheet.insertRowsBefore(maxRow, numberOfRows + 1);
  
  
  // Set all PENDING to SENT in R/Os sheet (ss)
  let sheet = ss.getSheetByName('R/Os');
  lastRow = sheet.getLastRow();
  for( r = 2; r <= lastRow; r++ ){
    let range = sheet.getRange(r, emailStatusColumn);
    if( range.getValue() == 'Pending' ){
      let color = sheet.getRange(r, 1).getBackground();
      range.setValue('SENT!').setBackground(color);
    }
  }
}


function deleteEmail(timestamp){
  let sheet = ssData.getSheetByName('Pending Emails');
  let lastRow = sheet.getLastRow();
  // Get array of existing timestamps
  let tsInfo = getTsInfo();
  // Check to make sure this email hasn't already been sent to pending
  for( i in tsInfo ){
    if( tsInfo[i].timestamp == timestamp ){
      var row = tsInfo[i].row;
      sheet.deleteRow(row);
      let maxRow = sheet.getMaxRows();
      sheet.insertRowBefore(maxRow);
    }
  }
}


function prepareEmail(sheet, row, outcome, timestamp){
  let pendingEmailsSheet = ssData.getSheetByName('Pending Emails');
  
  // Get array of existing timestamps
  let tsInfo = getTsInfo();
  let tsInfoTimestamps = getTsInfoTimestamps();
  
  // Check to make sure this email hasn't already been sent to pending
  //if( tsInfoTimestamps.indexOf(timestamp) > -1 ){ return; }
  
  // Check to see what the current email status is
  let emailStatus = sheet.getRange(row, emailStatusColumn).getValue();
  Logger.log(emailStatus);
  if( emailStatus != '' ){ deleteEmail(timestamp); }
  
  // Continue to setup email info and sending it to the Pending Email sheet (ssData)
  let name = sheet.getRange(row, nameColumn).getValue();
  let firstDay = sheet.getRange(row, firstDayColumn).getValue();
  let from = Utilities.formatDate(firstDay, "CST", "MMM dd, yyyy");
  let lastDay = sheet.getRange(row, lastDayColumn).getValue();
  let to = Utilities.formatDate(lastDay, "CST", "MMM dd, yyyy");
  let days = sheet.getRange(row, daysColumn).getValue();
  
  let email = sheet.getRange(row, emailColumn).getValue();
  let subject = 'Beerhead Request Off ' + outcome;
  let message = "";
  if( days === 1 ) {
    message = name + ',\r\n\r\nYour request off from ' + from + ' to ' + to + ' (' + days + ' day) has been ' + outcome;
  } else {
    message = name + ',\r\n\r\nYour request off from ' + from + ' to ' + to + ' (' + days + ' days) has been ' + outcome;
  }
  if( outcome == 'ACCEPTED' ){ message += '!' } else { message += '.'; }
  message += '\r\n\r\nIf you have any questions please reach out to the scheduling manager.\r\n\r\n\r\nCheers,\r\n\r\nBeerhead Scheduling-bot';
  
  let lastRow = pendingEmailsSheet.getLastRow();
  pendingEmailsSheet.getRange(lastRow + 1, 1).setValue(timestamp);
  pendingEmailsSheet.getRange(lastRow + 1, 2).setValue(email);
  pendingEmailsSheet.getRange(lastRow + 1, 3).setValue(subject);
  pendingEmailsSheet.getRange(lastRow + 1, 4).setValue(message);
  pendingEmailsSheet.getRange(lastRow + 1, 5).setValue(outcome);
  sheet.getRange(row, emailStatusColumn).setBackground(yellow).setValue('Pending');
}


function emailSentError(){
  let ui = SpreadsheetApp.getUi();
  ui.alert('ERROR:', 'An email has already been sent out for this request off.\r\nYou must contact the employee directly if you need to change anything.', ui.ButtonSet.OK);
}


// ******************************** //
// --  Request Off Color Methods -- //
// ******************************** //
function acceptRequestOff(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() != ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  } else {
    // Get current row that is selected via the cell selected
    var currentCell = sheet.getCurrentCell();
    var row = currentCell.getRow();
    // Check to see if the row has any info in it
    let valueCheck = sheet.getRange(row, 3).getValue();
    if( valueCheck == '' ){ 
      ss.toast("No request off found on selected row");
      return;
    }
    valueCheck = sheet.getRange(row, emailStatusColumn).getValue();
    if( valueCheck === 'SENT!' ){
      emailSentError();
      return;
    }
    // Check to see if the row has already been accepted
    valueCheck = sheet.getRange(row, emailStatusColumn).getValue();
    if( valueCheck === 'ACCEPTED' ){ return; }
    // Set accepted (green) color of the row
    sheet.getRange(row, 1, 1, daysColumn).setBackground(acceptROColor);
    
    // set info for trigger to email employee R/O accepted
    let value = sheet.getRange(row, timestampColumn).getValue();
    let timestamp = convertTimestamp(value);
    prepareEmail(sheet, row, 'ACCEPTED', timestamp);
  }
}


function denyRequestOff(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() != ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  } else {
    var currentCell = sheet.getCurrentCell();
    var row = currentCell.getRow();
    let valueCheck = sheet.getRange(row, 3).getValue();
    if( valueCheck === '' ){
      ss.toast("No request off found on selected row");
      return;
    }
    valueCheck = sheet.getRange(row, emailStatusColumn).getValue();
    if( valueCheck == 'SENT!' ){
      emailSentError();
      return;
    }
    // Check to see if the row has already been accepted
    valueCheck = sheet.getRange(row, emailStatusColumn).getValue();
    if( valueCheck === 'DENIED' ){ return; }
    // Set denied (red) color of the row
    sheet.getRange(row, 1, 1, daysColumn).setBackground(denyROColor);
    
    // set info for trigger to email employee R/O accepted
    let value = sheet.getRange(row, timestampColumn).getValue();
    let timestamp = convertTimestamp(value);
    prepareEmail(sheet, row, 'DENIED', timestamp);
  }
}


function resetRequestOff(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() != ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  } else {
    // Get current cell info including row currently seleced
    let currentCell = sheet.getCurrentCell();
    let row = currentCell.getRow();
    
    // Check to see if the row selected actually has anything in it
    let valueCheck = sheet.getRange(row, 3).getValue();
    if( valueCheck == '' ){
      ss.toast("No request off found on selected row");
      return;
    }
    valueCheck = sheet.getRange(row, emailStatusColumn).getValue();
    if( valueCheck == 'SENT!' ){
      emailSentError();
      return;
    }
    
    // Check to see if the current row has already been reset
    let emailStatusRange = sheet.getRange(row, emailStatusColumn);
    if( emailStatusRange.getValue() == '' ){ return; }
    
    // Proceed with resetting the row and removing the pending email info
    sheet.getRange(row, 1, 1, daysColumn).setBackground(resetColor);
    emailStatusRange.setValue('').setBackground(resetColor);
    let timestamp = convertTimestamp(sheet.getRange(row, timestampColumn).getValue());
    deleteEmail(timestamp);
  }
}


function toggleTimestamp(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() != ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  }
  if( sheet.isColumnHiddenByUser(timestampColumn) == true ){
    sheet.showColumns(timestampColumn);
    let a1N = sheet.getCurrentCell().getA1Notation();
    let oldRange = sheet.getRange(a1N);
    let range = sheet.getRange('A1');
    sheet.setActiveRange(range);
//    sheet.setActiveRange(oldRange);
  }
  else{ sheet.hideColumns(timestampColumn); }
}

function toggleEmail(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() != ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  }
  if( sheet.isColumnHiddenByUser(emailColumn) == true ){
    sheet.showColumns(emailColumn);
    let a1N = sheet.getCurrentCell().getA1Notation();
    let oldRange = sheet.getRange(a1N);
    let range = sheet.getRange('A1');
    sheet.setActiveRange(range);
//    sheet.setActiveRange(oldRange);
  }
  else{ sheet.hideColumns(emailColumn); }
}

/*
function toggleDateSubmitted(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if( sheet.getSheetName() != 'R/Os' ){ return; }
  if( sheet.isColumnHiddenByUser(dateSubmittedColumn) == true ){
    sheet.showColumns(dateSubmittedColumn);
    let a1N = sheet.getCurrentCell().getA1Notation();
    let oldRange = sheet.getRange(a1N);
    let range = sheet.getRange('A1');
    sheet.setActiveRange(range);
//    sheet.setActiveRange(oldRange);
  }
  else{ sheet.hideColumns(dateSubmittedColumn); }
}
*/

function showAll(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() !== ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  }
  
  if( sheet.isColumnHiddenByUser(timestampColumn) === true ){ sheet.showColumns(timestampColumn); }
  
  if( sheet.isColumnHiddenByUser(emailColumn) === true ){ sheet.showColumns(emailColumn); }
  
  //if( sheet.isColumnHiddenByUser(dateSubmittedColumn) == true ){ sheet.showColumns(dateSubmittedColumn); }
  
  let a1N = sheet.getCurrentCell().getA1Notation();
  let oldRange = sheet.getRange(a1N);
  let range = sheet.getRange('A1');
  sheet.setActiveRange(range);
//  sheet.setActiveRange(oldRange);
}

function hideAll(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getSheetName() != ROsSheetName){
    getWrongSheetErrorMsg('the R/Os');
    return;
  }
  
  if( sheet.isColumnHiddenByUser(timestampColumn) === false ){ sheet.hideColumns(timestampColumn); }
  
  if( sheet.isColumnHiddenByUser(emailColumn) === false ){ sheet.hideColumns(emailColumn); }
  
  //if( sheet.isColumnHiddenByUser(dateSubmittedColumn) == false ){ sheet.hideColumns(dateSubmittedColumn); }
}