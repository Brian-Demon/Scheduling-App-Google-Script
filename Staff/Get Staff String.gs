function getStaffString() {
  let sheet = rosterSourceSheet;
  let lastRow = sheet.getDataRange().getLastRow();
  let staffString = '';
  for(r = 1; r <= lastRow; r++ ){
    let name = sheet.getRange(r, 1).getValue();
    let title = sheet.getRange(r, 2).getValue();
    staffString += name + ' (' + title + ')\r\n';
  }
  return staffString;
}
