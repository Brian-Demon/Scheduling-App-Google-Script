function hideSchedule(){
  let sheet = SpreadsheetApp.getActive().getActiveSheet();;
  let sheetName = sheet.getName();
  if( defaultSheetNames.indexOf(sheetName) > -1 ){
    getWrongSheetErrorMsg('a scheduling');
    return;
  }
  sheet.hideSheet();
  sheet = ss.getSheetByName('Availability');
  sheet.activate();
}