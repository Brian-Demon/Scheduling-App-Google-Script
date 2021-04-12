function findMonday(s) {
  let sheet = s || ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let values = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  let arrayLength = values.length;
  for( i = 0; i < arrayLength; i++ ){
    var location = values[i].indexOf('Monday');
    if( location != -1 ){
      var row = i + 1;
      var column = location + 1;
    }
  }
  return sheet.getRange(row, column);
}
