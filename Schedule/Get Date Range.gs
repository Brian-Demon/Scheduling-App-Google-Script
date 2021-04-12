function getDateRange(date){
  // Get the Date range from Mondays sheet (ssData) for the sheet name and starting date (monday)
  let sheet = ssData.getSheetByName('Mondays');
  let lastRow = sheet.getLastRow();
  let array = [];
  for( r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === date ){
      let start = sheet.getRange(r, 1).getValue();
      let end = sheet.getRange(r, 4).getValue();
      let date = sheet.getRange(r, 5).getValue();
      array.push(start);
      array.push(end);
      array.push(date);
      break;
    }
  }
  return array;
}