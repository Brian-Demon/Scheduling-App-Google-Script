function makeNewWeek(date){
  let dateRange = getDateRange(date);
  let start = dateRange[0];
  let end = dateRange[1];
  let actualDate = dateRange[2];
  let sheetName = start + ' - ' + end;
  // Check to see if that sheet already exists, throw error if so
  if( ss.getSheetByName(sheetName) != null ){
    getError('That week already exists.');
    return;
  }
  /*
  let ui = SpreadsheetApp.getUi();
  ui.alert('Sheet Name:', sheetName, ui.ButtonSet.OK);
  */
  // Setup new sheet in (ss) for new week creation
  let source = ssData.getSheetByName('Template Source');
  if( source == null ){
    setupTemplate();
    source = ssData.getSheetByName('Template Source');
  }
  source.copyTo(ss);
  let sheet = ss.getSheetByName('Copy of Template Source');
  sheet.setName(sheetName);
  sheet.activate();
  let dateRow = getDateRow(sheet);
  let monday = Utilities.formatDate(actualDate, timezone, "MM/dd/yy");
  sheet.getRange(dateRow, 2).setValue(monday);
  fixDateFormula(sheet);
  fixAlignment(sheet);
  let frozenRow = getDateRow(sheet);
  let frozenColumn = 1;
  sheet.setFrozenColumns(frozenColumn);
  sheet.setFrozenRows(frozenRow);
  sheet.setTabColor(white);
  sheet.activate();
}