function toggleROStats(){
  let boolean = togglesSheet.getRange(statsRow, toggleColValue).getValue();
  let roster = getRosterArray();
  let sheetName = 'R/O Stats';
  if( ss.getSheetByName(sheetName) == null ){ ss.insertSheet(sheetName); ss.setActiveSheet(ss.getSheets()[0]);}
  let sheet = ss.getSheetByName(sheetName);
  if( boolean == false ){
    //loading();
    sheet.setTabColor(cyan);
    updateROStatsSheet();
    togglesSheet.getRange(statsRow, toggleColValue).setValue(true);
    //ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.setActiveSheet(ss.getSheetByName('R/O Stats'));
    //stopLoading();
  }
  else{
    ss.deleteSheet(sheet);
    togglesSheet.getRange(statsRow, toggleColValue).setValue(false);
  }
}