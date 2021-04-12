function editSchedule() {
  let ui = SpreadsheetApp.getUi();
  var editScheduleSB = HtmlService.createHtmlOutputFromFile('Schedule/Edit Schedule Sidebar').setTitle('Schedule Editor');
  ui.showSidebar(editScheduleSB);
}
