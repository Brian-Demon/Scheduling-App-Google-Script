function changeTitle() {
  let ui = SpreadsheetApp.getUi();
  // Check to see if the Template sheet is up
  let templateSheet = ss.getSheetByName("Template");
  // IF TEMPLATE IS ACTIVE, ALERT USER THEY MUST CLOSE IT FIRST THEN RETURN
  if( templateSheet ){
    ui.alert('ERROR: Template Open', 'You must close the "Template" before changing an employee title', ui.ButtonSet.OK);
    return;
  }
  var changeEmployeeTitleForm = HtmlService.createHtmlOutputFromFile('Staff/Change Title Sidebar').setTitle('Change Employee Title');
  ui.showSidebar(changeEmployeeTitleForm);
}


function changeEmployeeTitle(name, title){
  let employee = new Object();
  employee.name = name;
  employee.title = title;
  
  let sheet = rosterSourceSheet;
  let names = getRosterNames();
  let index = names.indexOf(name);
  if( index === -1 ){ return }
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert('Employee Info Entered', 'Name: ' + name + '\r\nTitle: ' + title + '\r\n\r\nIs this correct?', ui.ButtonSet.YES_NO_CANCEL);
  switch( response){
    case ui.Button.YES:
      loading();
      
      if( index !== -1 ){
        sheet.getRange(index + 1, 2).setValue(title);
      }
      
      
      let rosterBool = togglesSheet.getRange(rosterRow, 2).getValue();
      let statsBool = togglesSheet.getRange(statsRow, 2).getValue();
      if( statsBool == true ){ updateROStatsSheet(); }
      if( rosterBool == true ){ updateRosterSheet(); }
      organizeRoster();
      updateRosterSheet();
      updateSortedAvailability();
      //setupTemplate(); // <---------------  DELETES "Template Source"
      closeSidebar();
      organizeRoster();
      // DELETE EMPLOYEE FROM TEMPLATE ONLY TO ADD THEM BACK WITH THEIR NEW TITLE POSITION
//      updateTemplate(employee, 'remove');
//      updateTemplate(employee, 'add');
      stopLoading();
      break;
    case ui.Button.NO:
    case ui.Button.CLOSE:
      return;
      break;
    case ui.Button.CANCEL:
      closeSidebar();
      break;
    default: break;
  }
}