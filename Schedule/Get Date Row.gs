function getDateRow(sheet) {
  let lastRow = sheet.getLastRow();
  for( r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === 'DATE' ){ return r + 1; }
  }
  return null;
}
