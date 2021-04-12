function generateQuickReports() {
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  let sheetName = sheet.getName();
  Logger.log(sheetName);
  if( isDefaultSheet(sheet) ){
    getWrongSheetErrorMsg('a scheduling ');
    return;
  }
  checkSchedule();
  getAvailReport(sheetName);
  getPrefReport(sheetName);
}
