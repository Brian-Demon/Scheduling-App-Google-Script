function getStartColumn(s){
  let sheet = s || ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let values = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  let arrayLength = values.length;
  for( i = 0; i < arrayLength; i++ ){
    //Logger.log('i: ' + i + ', value = ' + values[i].toString());
    var location = values[i].indexOf('DATE');
    if( location != -1 ){
      var column = location + 1;
    }
  }
  //Logger.log(column);
  return column;
}
