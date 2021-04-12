function addEmployee(){
  let ui = SpreadsheetApp.getUi();
  // Check to see if the Template sheet is up
  let templateSheet = ss.getSheetByName("Template");
  // IF TEMPLATE IS ACTIVE, ALERT USER THEY MUST CLOSE IT FIRST THEN RETURN
  if( templateSheet ){
    ui.alert('ERROR: Template Open', 'You must close the "Template" before adding a new employee', ui.ButtonSet.OK);
    return;
  }
  var addEmployeeForm = HtmlService.createHtmlOutputFromFile('Staff/Add Employee Sidebar').setTitle('Add New Employee');
  ui.showSidebar(addEmployeeForm);
}


function addEmployeeInfo(name, title) {
  let sheet = rosterSourceSheet;
  let employee = new Object();
  
  employee.name = name;
  employee.title = title;
  
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert('Employee Info Entered', 'Name: ' + name + '\r\nTitle: ' + title + '\r\n\r\nIs this correct?', ui.ButtonSet.YES_NO_CANCEL);
  if( response === ui.Button.YES ){
    loading();
    addToRoster(employee);
    let rosterBool = togglesSheet.getRange(rosterRow, 2).getValue();
    let statsBool = togglesSheet.getRange(statsRow, 2).getValue();
    if( statsBool === true ){ updateROStatsSheet(); }
    if( rosterBool === true ){ updateRosterSheet(); }
    sheet = availabilityDataSheet;
    let lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 3).setValue(employee.name);
    updateSortedAvailability();
    stopLoading();
    // ----------------------------> ADD EMPLOYEE TO TEMPLATE PROMPT <------------------------------------------------------------ //
//    let newResponse = ui.alert('Add to Template?:', `Would you like to add ${name} to the template?\r\n\r\n`, ui.ButtonSet.YES_NO);
//    if( newResponse === ui.Button.YES ){
//      let templateSheet = ss.getSheetByName("Template");
//      // IF TEMPLATE IS ACTIVE, DELETE IT SO IT CAN BE FIXED IN THE DATABASE
//      if( templateSheet ) ss.deleteSheet(templateSheet);
//      // ADD EMPLOYEE TO TEMPLATE
//      updateTemplate(employee, "add");
//    }
    // TOAST OUT NEW EMPLOYEE ADDED
    ss.toast(`Add New Employee:\r\n\r\n${employee.name} added to the roster!`);
  } else if(response === ui.Button.CANCEL){
    closeSidebar();
  } else {
    return;
  }
}


function addToRoster(employee) {
  let ui = SpreadsheetApp.getUi();
  let name = employee.name;
  let title = employee.title;
  let sheet = rosterSourceSheet;
  let lastRow = sheet.getDataRange().getLastRow();
  let nextRow = lastRow + 1;
  
  sheet.getRange(nextRow, 1).setValue(name);
  sheet.getRange(nextRow, 2).setValue(title);
  
  resetToggleableSheets();
  closeSidebar();
  organizeRoster();
  
  // Update Template with new employee
  updateTemplate(employee, "add");
}