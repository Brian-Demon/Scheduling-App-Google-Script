function getTsInfo() {
  let sheet = ssData.getSheetByName('Pending Emails');
  let lastRow = sheet.getLastRow();
  let array = [];
  if( lastRow == 1 ){ return array; }
  for( r = 2; r <= lastRow; r++ ){
    let tsInfo = new Object();
    let value = sheet.getRange(r, 1).getValue();
    tsInfo.timestamp = Utilities.formatDate(value, timezone, dtFormat);
    tsInfo.row = r;
    //Logger.log('Timestamp: ' + Utilities.formatDate(value, timezone, dtFormat));
    //Logger.log('Row: ' + r);
    array.push(tsInfo);
  }
  return array;
}