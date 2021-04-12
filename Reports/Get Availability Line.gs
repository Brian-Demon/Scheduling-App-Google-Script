function getAvailLine(name){
  let source = ss.getSheetByName('Availability');
  let lastRow = source.getLastRow();
  let availLine = [];
  let row = 0;
  for( let r = 3; r <= lastRow; r++ ){
    let avialName = source.getRange(r, 2).getValue();
    if( avialName === name ){
      row = r;
      break;
    }
  }
  if( row === 0 ) return;
  let value = source.getRange(row, 3).getValue();
  if( value == noAvailString ){
//    Logger.log("No Avail Array at row: " + row);
    return [];
  }
  let values = source.getRange(row, 3, 1, 7).getBackgroundObjects();
  
  for( let i = 0; i < values[0].length; i++ ){
    availLine.push(convertToHex(values[0][i]));
  }
//  Logger.log(availLine.toString());
  return availLine;
}



function getPrefLine(name){
  let source = ss.getSheetByName('Availability');
  let lastRow = source.getLastRow();
  let availLine = [];
  let row = 0;
  for( let r = 3; r <= lastRow; r++ ){
    let avialName = source.getRange(r, 2).getValue();
    if( avialName == name ){
      row = r;
      break;
    }
  }
  if( row === 0 ) return;
  let value = source.getRange(row, 3).getValue();
  if( value == noAvailString ){
//    Logger.log("No Pref Array at row: " + row);
    return [];
  }
  let values = source.getRange(row, 10, 1, 7).getBackgroundObjects();
  
  for( let i = 0; i < values[0].length; i++ ){
    availLine.push(convertToHex(values[0][i]));
  }
//  Logger.log(availLine.toString());
  return availLine;
}