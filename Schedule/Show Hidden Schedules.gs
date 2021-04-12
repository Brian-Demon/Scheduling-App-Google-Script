function showHiddenSchedules(){
  let sheet = SpreadsheetApp.getActive().getActiveSheet();;
  let sheetName = sheet.getName();
  let sheets = ss.getSheets();
  
  if( areThereHiddenSheets() ){
    let ui = SpreadsheetApp.getUi();
    var showHiddenSheetForm = HtmlService.createHtmlOutputFromFile('Hidden Sheets Sidebar').setTitle('Show Hidden Schedule');
    ui.showSidebar(showHiddenSheetForm);
  }
  else{
    getError('There are no hidden sheets.');
  }
}