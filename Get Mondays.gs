function getMondays() {
  let array = [];
  let sheet = ssData.getSheetByName('Mondays');
  let lastRow = sheet.getLastRow();
  for( r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    array.push(value);
  }
  return array;
}