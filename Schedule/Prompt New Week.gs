function promptNewWeek(){
  let ui = SpreadsheetApp.getUi();
  var createNewWeekForm = HtmlService.createHtmlOutputFromFile('Schedule/Create New Week Sidebar').setTitle('Create New Schedule Week');
  ui.showSidebar(createNewWeekForm);
}