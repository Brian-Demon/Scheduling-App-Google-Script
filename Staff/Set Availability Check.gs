function setAvailabilityCheck() {
  let sheet = ssData.getSheetByName(sortedAvailabilitySheetName);
  let lastRow = sheet.getLastRow();
  for( r = 3; r <= lastRow; r++ ){
    let check = sheet.getRange(r, 3).getValue();
    if( check == null || check == '' ){ sheet.getRange(r, 3).setValue(false); }
  }
}
