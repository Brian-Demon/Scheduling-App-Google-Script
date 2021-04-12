function createNewWeek(date){
  let ui = SpreadsheetApp.getUi();
  let source = ssData.getSheetByName('Template Source');
  if( source.getName() == null ){ 
    setupTemplate();
    source = ssData.getSheetByName('Template Source');
  }
  var response = ui.alert('Creating New Schedule Week', 'Starting date selected: ' + date, ui.ButtonSet.OK_CANCEL);
  if( response == ui.Button.CANCEL ){
    closeSidebar();
    return;
  }
  if( response === ui.Button.CLOSE ){ return; }
  loading();
  closeSidebar();
  makeNewWeek(date);
  stopLoading();
}