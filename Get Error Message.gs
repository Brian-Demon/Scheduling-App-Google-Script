function getWrongSheetErrorMsg(validSheetName) {
//  let ui = SpreadsheetApp.getUi();
  let errorHeader = 'ERROR: Invalid Sheet -- ';
  let sheetName = validSheetName || 'a valid'
  let errorBody = 'You must be on ' + validSheetName + ' sheet to use this menu option.';
  ss.toast(`${errorHeader}\r\n\r\n${errorBody}`);
//  ui.alert(errorHeader, errorBody, ui.ButtonSet.OK);
}

function getError(error){
//  let ui = SpreadsheetApp.getUi();
//  ui.alert('ERROR:', error, ui.ButtonSet.OK);
  ss.toast(`ERROR: ${error}`);
}


function emailErrorMsg(){
//  let ui = SpreadsheetApp.getUi();
//  ui.alert('ERROR:', 'There are no emails to send', ui.ButtonSet.OK);
  ss.toast("ERROR: There are no emails to send");
}