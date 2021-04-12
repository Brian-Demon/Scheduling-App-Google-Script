function toggleRoster() {
  let boolean = togglesSheet.getRange(rosterRow, toggleColValue).getValue();
  let roster = getRosterArray();
  let sheetName = 'Roster';
  if( ss.getSheetByName(sheetName) == null ){
    ss.insertSheet(sheetName);
    ss.setActiveSheet(ss.getSheets()[0]);
  }
  let sheet = ss.getSheetByName(sheetName);
  if( boolean == false ){
    //loading();
    sheet.setTabColor(red);
    updateRosterSheet();
    organizeRoster();
    togglesSheet.getRange(rosterRow, toggleColValue).setValue(true);
    //ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.setActiveSheet(ss.getSheetByName('Roster'));
    //stopLoading();
  }
  else{
    ss.deleteSheet(sheet);
    togglesSheet.getRange(rosterRow, toggleColValue).setValue(false);
  }
}
