function getAvailRow(availNames, name){
  let sheet = ss.getSheetByName('Availability');
  let lastRow = sheet.getLastRow();
  let row = availNames.indexOf(name) + 3;
  return row;
}