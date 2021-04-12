function resetToggleableSheets(){
  resetRosterSheet();
  resetROStatsSheet();
}


function resetRosterSheet() {
  let sheet = ss.getSheetByName('Roster');
  if( sheet != null ){
    ss.deleteSheet(sheet);
    togglesSheet.getRange(rosterRow, toggleColValue).setValue(false);
    toggleRoster();
  }
}


function resetROStatsSheet() {
  let sheet = ss.getSheetByName('R/O Stats');
  if( sheet != null ){
    ss.deleteSheet(sheet);
    togglesSheet.getRange(statsRow, toggleColValue).setValue(false);
    toggleROStats();
  }
}