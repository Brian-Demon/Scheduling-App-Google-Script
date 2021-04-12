function changeSchedulingManagerEmail(){
  let ui = SpreadsheetApp.getUi();
  let email = ssData.getSheetByName("Scheduling Manager Email").getRange(1, 1).getValue();
  let response = ui.alert("Change Scheduling Manager Email", `Current email for the scheduling manager on file is "${email}", would you like to change it?`, ui.ButtonSet.YES_NO);
  if( response !== ui.Button.YES ) return;
  response = ui.prompt("Change Scheduling Manager Email", "Please enter the new email address for the scheduling manager:", ui.ButtonSet.OK_CANCEL);
  if( response.getSelectedButton() !== ui.Button.OK ) return;
  email = response.getResponseText();
  ssData.getSheetByName("Scheduling Manager Email").getRange(1, 1).setValue(email);
  ui.alert("SUCCESS", `Scheduling Manager's email changed to "${email}"`, ui.ButtonSet.OK);
}