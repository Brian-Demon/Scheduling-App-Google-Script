function getRosterList(){
  let sheet = rosterSourceSheet;
  let lastRow = sheet.getLastRow();
  return sheet.getRange(1, 1, lastRow, 1).getValues();
}


function getDateList(){
  let sheet = ssData.getSheetByName('Mondays');
  let lastRow = sheet.getLastRow();
  for( r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 3).getValue();
    if( value >= 0 ){
      var row = r;
      break;
    }
  }
  let values = sheet.getRange(row, 1, (lastRow - row + 1), 1).getValues();
  return values;
}


function getHiddenSheetsList(){
  let sheets = ss.getSheets();
  if( ssData.getSheetByName('Temp') != null ){ ssData.deleteSheet(ssData.getSheetByName('Temp')); }
  let temp = ssData.insertSheet('Temp');
  let sheetNames = [];
  let row = 1;
  for( i = 0; i < sheets.length; i++ ){
    if( sheets[i].isSheetHidden() ){
      //Logger.log(row);
      temp.getRange(row, 1).setValue(sheets[i].getName());
      row++;
    }
  }
  sheetNames = temp.getRange(1, 1, temp.getLastRow(), 1).getValues();
  //Logger.log(sheetNames.toString());
  ssData.deleteSheet(temp);
  return sheetNames;
}