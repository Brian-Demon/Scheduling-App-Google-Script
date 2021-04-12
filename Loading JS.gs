function loading() {
  let sheet = ssData.getSheetByName(togglesSheetName);
  let checkRange = sheet.getRange(loadingRow,2);
  let check = checkRange.getValue();
  if( check ) return;
  let ui = SpreadsheetApp.getUi();
  var loading = HtmlService.createHtmlOutputFromFile('Loading').setTitle('LOADING...');
  checkRange.setValue(true);
  ui.showModalDialog(loading, ' ');
}
