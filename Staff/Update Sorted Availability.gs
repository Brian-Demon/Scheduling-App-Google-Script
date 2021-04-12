function updateSortedAvailability() {
  // See if the person who submitted the newset availability already has one on file
  // If so, stoe the old availability in the Old Availabilities Sheet and delete the old onee from the data sheet
  findRemoveDupAvail();
  // Check if every person has an availability, if not set collumn next to name to false
  setAvailabilityCheck();
  // Sort the new Availability Data Sheet in thee format based on staff rank
  sortAvailability();
  // Send updated availability to main spreadsheet (ss)
  sendSortedAvailability();
}

function findRemoveDupAvail(){
  let sheet = availabilityDataSheet;
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  
  let existingNames = [];
  let newName = sheet.getRange(lastRow, 3).getValue();
//  Logger.log(newName);
  for( r = 2; r <= lastRow - 1; r++ ){
    let name = sheet.getRange(r, 3).getValue();
    existingNames.push(name);
  }
//  Logger.log('existingNames: ' + existingNames.toString());
  
  // Check if the name of the person who submitted a new availability already has one on file //
  let rowToMoveThenDelete = 0;
  if( existingNames.indexOf(newName > -1 )){
    for( i = 0; i < existingNames.length; i++ ){
      let name = existingNames[i];
//      Logger.log('@i: ' + i);
//      Logger.log('name: ' + name);
//      Logger.log('newName: ' + newName);
      if( name === newName ){
        rowToMoveThenDelete = i + 2;
        let target = oldAvailabilitiesSheet;
        let nextRow = target.getLastRow() + 1;
        sheet.getRange(rowToMoveThenDelete, 1, 1, lastColumn).copyTo(target.getRange(nextRow, 1));
        sheet.deleteRow(rowToMoveThenDelete);
        sheet.getRange(2, 1, lastRow, lastColumn).sort({column: 3, ascending: true});
      }
    }
  }
}

function sortAvailability() {
  let source = availabilityDataSheet;
  let target = sortedAvailabilitySheet;
  let staff = getSortedStaff();
  //getObjectArrayLogs(staff);
  let currentNames = getArray2(source, 2, 3);
  //Logger.log(currentNames.toString());
  target.clear();
  //getAvailabilityHeader(target);
  let startRow = 3;
  let startColumn = 2;
  target.setColumnWidth(1, 5);
  target.setRowHeight(1, 5);
  for( i = 0; i < staff.length; i ++ ){
    target.getRange(i + startRow, startColumn).setValue(staff[i].name).setBorder(true,true,true,true,true,true,black,solid);
    let neededName = staff[i].name;
    let index = currentNames.indexOf(neededName);
    //Logger.log('@i: ' + i);
    //Logger.log('Need: ' + neededName);
    if( index > -1 ){
      let availToSendRange = source.getRange(index + 2, 4, 1, 14);
      var targetRange = target.getRange(i + startRow, startColumn + 1);
      availToSendRange.copyTo(targetRange);
      target.getRange(i + startRow, startColumn + 1, 1, 14).setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solid);
      //Logger.log('Index: ' + index);
    }
    else{ target.getRange(i + startRow, startColumn + 1).setValue(false).setFontWeight('bold').setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solid); }
  }
  getAvailabilityHeader(target);
}

function sendSortedAvailability() {
  let target = ss.getSheetByName('Availability');
  ss.deleteSheet(target);
  ss.insertSheet(availabilitySheetName, 0);
  target = ss.getSheetByName(availabilitySheetName);
  let source = sortedAvailabilitySheet;
  let lastRow = source.getLastRow();
  let lastColumn = source.getLastColumn();
  let values = source.getDataRange().getValues();
  target.getRange(1, 1, lastRow, lastColumn).setValues(values);
  fixAvailabilitySheetFormat();
  setAvailConditionalFormating();
}

function fixAvailabilitySheetFormat() {
  let sheet = ss.getSheetByName(availabilitySheetName);
  sheet.setTabColor(purple);
  let lastRow = sortedAvailabilitySheet.getLastRow();
  let lastColumn = sortedAvailabilitySheet.getLastColumn();
  let startRow = 3;
  let startColumn = 2;
  let namesRange = sheet.getRange(startRow, startColumn, lastRow - 2, 1);
  let bodyRange = sheet.getRange(startRow, startColumn + 1, lastRow - 2, lastColumn - 2);
  
  namesRange.setFontWeight('bold').setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solid);
  bodyRange.setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solid);
  
  getAvailabilityHeader(sheet);
  myAutoResizeColumns(sheet, startColumn + 1, 14);
  
  for( r = startRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, startColumn + 1).getValue();
    if( value == false ){
      targetRange = sheet.getRange(r, startColumn + 1, 1, 14)
      targetRange.setValue(noAvailString).mergeAcross().setBorder(true,true,true,true,true,true,black,solid);
    }
  }
  
  sheet.setColumnWidth(1, 5);
  sheet.setRowHeight(1, 5);
  getAvailabilityHeader(sheet);
}

function setAvailConditionalFormating(){
//  loading();
  var source = ss.getSheetByName(availabilitySheetName);
  let lastRow = source.getLastRow();
  let lastColumn = source.getLastColumn();
  let range = source.getRange("C3:P50");
  var ranges = [range];
  
  var anyFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("ANY")
    .setBackground(anyColor)
    .setRanges(ranges)
    .build();
  var offFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("OFF")
    .setBackground(offColor)
    .setRanges(ranges)
    .build();
  var openFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("OPEN")
    .setBackground(openColor)
    .setRanges(ranges)
    .build();
  var midFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("MID")
    .setBackground(midColor)
    .setRanges(ranges)
    .build();
  var closeFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("CLOSE")
    .setBackground(closeColor)
    .setRanges(ranges)
    .build();
  var openmidFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("OPEN/MID")
    .setBackground(openMidColor)
    .setRanges(ranges)
    .build();
  var midcloseFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("MID/CLOSE")
    .setBackground(midCloseColor)
    .setRanges(ranges)
    .build();
  var opencloseFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("OPEN/CLOSE")
    .setBackground(openCloseColor)
    .setRanges(ranges)
    .build();
  var noAvailFormat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo(noAvailString)
    .setBackground(yellow)
    .setRanges(ranges)
    .build();
  
  source.clearConditionalFormatRules();
  var rules = source.getConditionalFormatRules();
  rules.push(anyFormat);
  rules.push(offFormat);
  rules.push(openFormat);
  rules.push(midFormat);
  rules.push(closeFormat);
  rules.push(openmidFormat);
  rules.push(midcloseFormat);
  rules.push(opencloseFormat);
  rules.push(noAvailFormat);
  source.setConditionalFormatRules(rules);
  
  range = source.getRange(3, 3, lastRow, lastColumn);
  var colors = range.getBackgroundObjects();
  for ( i = 0 ; i < colors.length; i++ ) {
    for ( j = 0; j < colors[i].length; j++ ) {
      let row = i + 3;
      let column = j + 3;
      Logger.log('Row: ' + row);
      Logger.log('Column: ' + column);
      //Logger.log('i: ' + i + ', j: ' + j + ' = ' + colors[i][j].asRgbColor().asHexString());
      if( colors[i][j].asRgbColor().asHexString() == white ){
        //Logger.log('White found at [' + i + '][' + j + ']');
        //source.getRange(3 + i, 3 + j).setBackground(magenta);
      }
    }
  }
  /*
  for( r = 3; r <= lastRow; r++ ){
    for( c = 3; c <= lastColumn; c++ ){
      let cell = source.getRange(r, c);
      if( cell.getBackground() == white ){
        cell.setBackground(magenta);
      }
    }
  }
  */
//  stopLoading();
}

function getAvailabilityHeader(sheet){
  let row = 2;
  let column = 2;
  sheet.getRange(row, column).setValue('Name').setBackground(lightPurple2).setFontWeight('bold');
  sheet.getRange(row, column + 1).setValue('MON (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 2).setValue('TUE (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 3).setValue('WED (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 4).setValue('THU (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 5).setValue('FRI (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 6).setValue('SAT (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 7).setValue('SUN (A)').setBackground(lightGreen2).setFontWeight('bold');
  sheet.getRange(row, column + 8).setValue('MON (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column + 9).setValue('TUE (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column + 10).setValue('WED (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column + 11).setValue('THU (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column + 12).setValue('FRI (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column + 13).setValue('SAT (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column + 14).setValue('SUN (P)').setBackground(lightBlue2).setFontWeight('bold');
  sheet.getRange(row, column, 1, 15).setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solidMedium);
}

function getArray2(sheet, startRow, column){
  let lastRow = sheet.getLastRow();
  let array = [];
  for( r = startRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
    array.push(value);
  }
  return array;
}

function myAutoResizeColumns(sheet, startColumn, numberOfColumns) {
  sheet.autoResizeColumns(startColumn, numberOfColumns);
  let fixColumn = startColumn + numberOfColumns;
  let maxColumn = sheet.getMaxColumns();
  if( fixColumn > maxColumn ){ sheet.insertColumns(maxColumn, fixColumn - maxColumn + 1); }
  let currentLastColumnWidth = sheet.getColumnWidth(fixColumn);
  sheet.setColumnWidth( fixColumn, currentLastColumnWidth + 5);
}