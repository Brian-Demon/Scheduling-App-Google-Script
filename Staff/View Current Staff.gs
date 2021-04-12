function viewCurrentStaff(){
  let ui = SpreadsheetApp.getUi();
  let currentStaff = getStaffString();
  ui.alert('Current Staff:', currentStaff, ui.ButtonSet.OK);
}