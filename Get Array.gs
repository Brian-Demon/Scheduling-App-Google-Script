function getArray(sheet, startRow, endRow, column) {
  let s = sheet || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let sr = startRow || 1;
  let lastRow = endRow || sheet.getLastRow();
  let col = column || 1;
  let array = [];
  for( r = sr; r <= lastRow; r++ ){ array.push(sheet.getRange(r, col).getValue()); }
  return array;
}
