function updateRosterSheet() {
  let sheetName = 'Roster';
  if( ss.getSheetByName(sheetName) == null ){ return; }
  let sheet = ss.getSheetByName(sheetName);
  let roster = getRosterArray();
  sheet.clear();
  sheet.getRange(2, 2).setValue('Name').setBackground(lightBlue2);
  sheet.getRange(2, 3).setValue('Title').setBackground(lightPurple2);
  for( i = 0; i < roster.length; i++ ){
    sheet.getRange(i + 3, 2).setValue(roster[i].name).setBorder(true,true,true,true,true,true,black,solid);
    sheet.getRange(i + 3, 3).setValue(roster[i].title).setBorder(true,true,true,true,true,true,black,solid);
  }
  sheet.getRange(2, 2, 1, 2).setFontWeight('bold').setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solidMedium);
  sheet.autoResizeColumns(2, 2);
  sheet.setColumnWidth(1, 5);
  sheet.setRowHeight(1, 5);
  let lastColumnSize = sheet.getColumnWidth(3);
  sheet.setColumnWidth(3, lastColumnSize + 5);
  organizeRoster();
}


function updateROStatsSheet(){
  let sheetName = 'R/O Stats';
  if( ss.getSheetByName(sheetName) == null ){ return; }
  let sheet = ss.getSheetByName(sheetName);
  let roster = getRosterArray();
  sheet.clear();
  sheet.getRange(2, 2).setValue('Name').setBackground(lightOrange2);
  sheet.getRange(2, 3).setValue('Days').setBackground(lightRed2);
  for( i = 0; i < roster.length; i++ ){
    sheet.getRange(i + 3, 2).setValue(roster[i].name).setBorder(true,true,true,true,true,true,black,solid);
    let formula = "=sumif('R/Os'!C:C, $B" + (i + 3) + ",'R/Os'!H:H)";
    sheet.getRange(i + 3, 3).setValue(formula).setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solid);
  }
  sheet.getRange(2, 2, 1, 2).setFontWeight('bold').setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,black,solidMedium);
  sheet.autoResizeColumns(2, 2);
  sheet.setColumnWidth(1, 5);
  sheet.setRowHeight(1, 5);
  let lastColumnSize = sheet.getColumnWidth(3);
  sheet.setColumnWidth(3, lastColumnSize + 5);
}