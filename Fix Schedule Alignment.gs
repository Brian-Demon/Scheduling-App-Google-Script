function fixAlignment(sheet){
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn() - 1;
  sheet.getRange(1, 1, lastRow, lastColumn).setVerticalAlignment("middle");
  sheet.getRange(1, 1).setHorizontalAlignment("Center");
  sheet.getRange(2, 1, lastRow - 1, 1).setHorizontalAlignment("Left");
  sheet.getRange(1, 2, lastRow, lastColumn).setHorizontalAlignment("Center");
}
