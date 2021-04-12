function stopLoading(){
  let sheet = ssData.getSheetByName(togglesSheetName);
  let checkRange = sheet.getRange(loadingRow,2);
  checkRange.setValue(false);
  closeHTMLBox();
}