function removeEmployee(){
  let ui = SpreadsheetApp.getUi();
  // Check to see if the Template sheet is up
  let templateSheet = ss.getSheetByName("Template");
  // IF TEMPLATE IS ACTIVE, ALERT USER THEY MUST CLOSE IT FIRST THEN RETURN
  if( templateSheet ){
    ui.alert('ERROR: Template up', 'You must close the "Template" before removing an employee', ui.ButtonSet.OK);
    return;
  }
  
  // Activate Remove Employee Sidebar
  organizeRoster();
  var removeEmployeeForm = HtmlService.createHtmlOutputFromFile('Staff/Remove Employee Sidebar').setTitle('Remove Employee');
  ui.showSidebar(removeEmployeeForm);
}


function removalExecute(name) {
  let selectedName = name;
  if( selectedName == '-- Select Employee --' || selectedName == null || selectedName == '' ){ return; }
  let ui = SpreadsheetApp.getUi();
  //ui.alert('Test', 'Name: ' + name, ui.ButtonSet.OK);
  let rosterNames = getRosterNames();
  let index = rosterNames.indexOf(selectedName);
  //ui.alert('Index Of Name: "' + selectedName + '"', index, ui.ButtonSet.OK);
  let row = rosterNames.indexOf(selectedName) + 1;
  let sheet = rosterSourceSheet;
  let response = ui.alert('Remove Employee: ', `Removing: ${selectedName}\r\n\r\nIs this correct?\r\n`, ui.ButtonSet.YES_NO_CANCEL);
  switch( response ){
    case ui.Button.CLOSE:
    case ui.Button.NO:
      return;
      break;
    case ui.Button.YES:
      loading();
      sheet.deleteRow(row);
      closeSidebar();
      let staff = getStaffString();
      // check to see if Roster and R/O sheet are active, then reset them
      resetToggleableSheets();
      updateSortedAvailability();
      organizeRoster();
      ss.setActiveSheet(ss.getSheets()[0]);
      stopLoading();
      // ----------------------------> REMOVE EMPLOYEE TO TEMPLATE PROMPT <------------------------------------------------------------ //
//      let newResponse = ui.alert('Delete from Template?:', `Would you like to remove ${name} from the template?\r\n\r\n`, ui.ButtonSet.YES_NO);
//      if( newResponse === ui.Button.YES ){
//        let templateSheet = ss.getSheetByName("Template");
//        // IF TEMPLATE IS ACTIVE, DELETE IT SO IT CAN BE FIXED IN THE DATABASE
//        if( templateSheet ) ss.deleteSheet(templateSheet);
//        // ADD EMPLOYEE TO TEMPLATE
//        updateTemplate(employee, "remove");
//      }
      ss.toast(`Remove Employee:\r\n\r\n${employee.name} removed from the roster`);
      break;
    case ui.Button.CANCEL:
      closeSidebar();
      break;
    default:
      break;
  }
  let rosterBool = togglesSheet.getRange(rosterRow, 2).getValue();
  let statsBool = togglesSheet.getRange(statsRow, 2).getValue();
  if( statsBool == true ){ updateROStatsSheet(); }
  if( rosterBool == true ){ updateRosterSheet(); }
  //ui.alert('Successfully selected "' + selectedName + '"', 'rosterSourceSheet deleted Row: ' + row, ui.ButtonSet.OK);
}
