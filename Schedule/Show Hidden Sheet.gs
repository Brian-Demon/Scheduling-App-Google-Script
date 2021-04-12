function showHiddenSheet(sheetName){
  let sheet = ss.getSheetByName(sheetName);
  sheet.showSheet();
  ss.setActiveSheet(sheet);
  closeSidebar();
}