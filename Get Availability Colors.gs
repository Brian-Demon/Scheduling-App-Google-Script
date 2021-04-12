function getAvailColors(availNames, name) {
  let sheet = ss.getSheetByName('Availability');
  let availColors = [];
  let lastRow = sheet.getLastRow();
  let values = sheet.getRange(3, 3, 1, 7).getValues();
  let row = availNames.indexOf(name) + 3;
  Logger.log('Row: ' + row);
  for( o = 3; o <= lastRow; o++ ){
    
  }
  return availColors;
}