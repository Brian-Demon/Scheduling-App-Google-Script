function closeHTMLBox() {
  var html = HtmlService.createHtmlOutput("<script>google.script.host.close();</script>");
  SpreadsheetApp.getUi().showModelessDialog(html, ' ');
  return;
}