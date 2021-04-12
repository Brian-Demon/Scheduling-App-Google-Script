function shiftColor(type){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let sheetName = sheet.getSheetName();
  let selectedRange = sheet.getSelection().getActiveRange();
  if( isDefaultSheet(sheet) === true ){
    getWrongSheetErrorMsg('a scheduling week');
    return;
  }
  switch( type ){
    case 'special':
      special(selectedRange);
      break;
    case 'training':
      training(selectedRange);
      break;
    case 'ro':
      requestOff(selectedRange);
      break;
    case 'inventory':
      inventory(selectedRange);
      break;
    case 'open':
      openingShift(selectedRange);
      break;
    case 'mid':
      midShift(selectedRange);
      break;
    case 'close':
      closingShift(selectedRange);
      break;
    case 'change':
      changesMade(selectedRange);
      break;
    case 'reset':
      reset(selectedRange);
      break;
    case 'unavail':
      unavail(selectedRange);
      break;
    default:
      break;
  }
}
