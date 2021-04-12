function getAvailNames(){
  let sheet = ss.getSheetByName('Availability');
  let availNames = [];
  let lastRow = sheet.getLastRow();
  for( r = 3; r < lastRow; r++ ){
    let value = sheet.getRange(r, 2).getValue();
    availNames.push(value);
  }
  return availNames;
}