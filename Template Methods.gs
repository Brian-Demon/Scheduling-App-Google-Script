function getTemplateNamesSection(title){ // Takes either an amployees title
  if( !title ){
    ss.toast('ERROR in "getTemplateNameSection": No title passed where ever it was called from');
    return null;
  }
  let sheet = ssData.getSheetByName(templateSourceSheetName);
  let lastRow = sheet.getLastRow();
  let section = {
    start: 0,
    end: 0,
    difference: 0,
    manager: false
  }
  let start = "";
  let end = "";
  let startGot = false;
  
  if( title !== "FOH" && title !== "BOH" ){
//    Logger.log("IN MANAGERS");
    for( let r = 1; r <= lastRow; r++ ){
      let value = sheet.getRange(r, 1).getValue();
      if( value.match(/\(/) && value.match(/\)/) ) { 
        let valueArray = value.split(" ");
        let templateTitle = valueArray[1].substr(1, valueArray[1].length - 2);
        if( templateTitle === title && !startGot ){
          section.start = r;
          section.end = r;
          startGot = true;
        } else if( templateTitle === title && startGot ){
          section.end += 1;
        }
      }
    }
    section.difference = section.end - section.start + 1;
    section.manager = true;
    Logger.log(`For ${title}: Start: ${section.start}, End: ${section.end}, Difference: ${section.difference}`);
    return section;
  }
  
//  Logger.log("OUT OF MANAGERS");
  start = title;
  if( title === "FOH" ) end = "BOH";
  else end = "";
  for( let r = 1; r <= lastRow + 1; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === start ) section.start = r + 1;
    if( value === end && section.start > 0 ){
      section.end = r - 1;
      section.difference = section.end - section.start + 1;
      Logger.log(`\r\nFor ${title}: Start: ${section.start}, End: ${section.end}, Difference: ${section.difference}`);
      return section;
    }
  }
}


function getTemplateRoster(){ // Returns Obj containing name and titles and row found in template
  let sheet = ssData.getSheetByName(templateSourceSheetName);
  let lastRow = sheet.getLastRow();
  let templateRoster = [];
  let startingRow = 0;
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === "MANAGERS" ){
      startingRow = r + 1;
      break;
    }
  }
  // Get managers
  for( let r = startingRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === "FOH" ){
      startingRow = r + 1;
      break;
    }
    let indexOfSpace = value.indexOf(" ");
    let name = value.substring(0, indexOfSpace);
    let title = value.substring(indexOfSpace + 2, value.length - 1);
    let employee = {
      name: name,
      title: title,
      row: r
    }
    templateRoster.push(employee);
//    Logger.log(`@r: ${r} -- firstName: "${firstName}", titleString: "${titleString}"`);
  }
  // Get FOH
  for( let r = startingRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    if( value === "BOH" ){
      startingRow = r + 1;
      break;
    }
    let employee = {
      name: value,
      title: "FOH",
      row: r
    }
    templateRoster.push(employee);
//    Logger.log(`@r: ${r} -- firstName: "${firstName}", titleString: "${titleString}"`);
  }
  // Get BOH
  for( let r = startingRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 1).getValue();
    let employee = {
      name: value,
      title: "BOH",
      row: r
    }
    templateRoster.push(employee);
//    Logger.log(`@r: ${r} -- firstName: "${firstName}", titleString: "${titleString}"`);
  }
  
  return templateRoster;
}


function closeTemplate(){
  let ui = SpreadsheetApp.getUi();
  let del = ss.getSheetByName('Template');
  if( del === null ){ return; }
  let response = ui.alert('Close Template Editor', 'Any unsaved changes will be lost.\r\n\r\nDo you want to save the current Template?', ui.ButtonSet.YES_NO_CANCEL);
  if( response == ui.Button.YES ){
    saveTemplate();
    ss.deleteSheet(del);
  }
  if( response == ui.Button.NO ){ ss.deleteSheet(del); }
}


function resetTemplate(){
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert('Reset Template', 'Resetting the template will delete all previously saved data.\r\n\r\nAre you sure you want to reset the Template?', ui.ButtonSet.YES_NO);
  if( response !== ui.Button.YES){ return; }
  
  loading();
  
  // Reset Template
  setupTemplate();
  
  // Ask if the user wants to open the now reset Template...
  response = ui.alert('Open Template?', 'Would you like to open the now reset Template to edit?', ui.ButtonSet.YES_NO);
  if( response != ui.Button.YES ){ return; }
  
  // If YES clicked...
  editTemplate();
  
  fixDateFormula(ss.getSheetByName('Template'));
  fixAlignment(ss.getSheetByName('Template'));
  
  stopLoading();
}


function setupTemplate(){
  let del = ssData.getSheetByName('Template Source');
  if( del !== null ){ ssData.deleteSheet(del); }
  let master = ssData.getSheetByName('Master Template');
  if( master.isSheetHidden() ){ master.showSheet(); }
  master.copyTo(ssData);
  let source = ssData.getSheetByName('Copy of Master Template');
  source.setName('Template Source');
  organizeRoster();
  let staff = getRosterArray();
  let pos = 0;
  let FO = [];
  let GM = [];
  let AGM = [];
  let SL = [];
  let FOH = [];
  let BOH = [];
  let titles = getRosterTitles();
  let names = getRosterNames();
  let value = '';
  for( pos in titles ){
    value = titles[pos];
    if( value === 'FO' ){ FO.push(names[pos] + ' (' + value + ')'); }
  }
  for( pos in titles ){
    value = titles[pos];
    if( value === 'GM' ){ GM.push(names[pos] + ' (' + value + ')'); }
  }
  for( pos in titles ){
      value = titles[pos];
      if( value === 'AGM' ){ AGM.push(names[pos] + ' (' + value + ')'); }
    }
  for( pos in titles ){
    value = titles[pos];
    if( value === 'SL' ){ SL.push(names[pos] + ' (' + value + ')'); }
  }
  for( pos in titles ){
    value = titles[pos];
    if( value === 'FOH' ){ FOH.push(names[pos]); }
  }
  for( pos in titles ){
    value = titles[pos];
    if( value === 'BOH' ){ BOH.push(names[pos]); }
  }
  /*
  Logger.log('FO: ' + FO.toString());
  Logger.log('GM: ' + GM.toString());
  Logger.log('AGM: ' + AGM.toString());
  Logger.log('SL: ' + SL.toString());
  Logger.log('FOH: ' + FOH.toString());
  Logger.log('BOH: ' + BOH.toString());
  */
  source = ssData.getSheetByName('Template Source');
  let lastRow = source.getLastRow();
  let lastColumn = source.getLastColumn();
  let lengths = [];
  let MGRStartRow = 0;
  // Find starting row for row inserts
  for( r = 1; r < lastRow; r++ ){ if( source.getRange(r, 1).getValue() == "MANAGERS" ){ MGRStartRow = r; }}
  let MGRRows = (FO.length + GM.length + AGM.length + SL.length);
  let FOHRows = FOH.length;
  let BOHRows = BOH.length;
  let FOHStartRow = MGRStartRow + MGRRows + 1;
  let BOHStartRow = MGRStartRow + MGRRows + FOHRows + 2;
  // Insert rows for number of employees to fill them after
  /*
  Logger.log('MGRStartRow: ' + MGRStartRow);
  Logger.log('MGRRows: ' + MGRRows);
  Logger.log('FOHStartRow: ' + FOHStartRow);
  Logger.log('FOHRows: ' + FOHRows);
  Logger.log('BOHStartRow: ' + BOHStartRow);
  Logger.log('BOHRows: ' + BOHRows);
  */
  source.insertRowsAfter(MGRStartRow, MGRRows);
  source.insertRowsAfter(FOHStartRow, FOHRows);
  source.insertRowsAfter(BOHStartRow, BOHRows);
  
  let MGRRange = source.getRange(MGRStartRow, 1, MGRRows + 1, lastColumn);
  let FOHRange = source.getRange(FOHStartRow, 1, FOHRows + 1, lastColumn);
  let BOHRange = source.getRange(BOHStartRow, 1, BOHRows + 1, lastColumn);
  // Fix formatting of newly added rows for employees
  
  MGRRange.setBackground(resetColor).setBorder(true, true, true, true, true, true, black, solid);
  FOHRange.setBackground(resetColor).setBorder(true, true, true, true, true, true, black, solid);
  BOHRange.setBackground(resetColor).setBorder(true, true, true, true, true, true, black, solid);
  
  // Add amployees names (and titles for managers)
  // Get managers array for ease of entry
  let MGRS = [];
  for( let i in FO ){ MGRS.push(FO[i]); }
  for( let i in GM ){ MGRS.push(GM[i]); }
  for( let i in AGM ){ MGRS.push(AGM[i]); }
  for( let i in SL ){ MGRS.push(SL[i]); }
  Logger.log('MGRS length: ' + MGRS.length);
  Logger.log('FOH length: ' + FOH.length);
  Logger.log('BOH length: ' + BOH.length);
  
  for( i = 0; i < MGRS.length; i++){ source.getRange(MGRStartRow + i + 1, 1).setValue(MGRS[i]); }
  for( i = 0; i < FOH.length; i++){ source.getRange(FOHStartRow + i + 1, 1).setValue(FOH[i]); }
  for( i = 0; i < BOH.length; i++){ source.getRange(BOHStartRow + i + 1, 1).setValue(BOH[i]); }
  
  // Fix grey for section deviders
  source.getRange(MGRStartRow, 1, 1, 2).setBackground(grey);
  source.getRange(FOHStartRow, 1, 1, 2).setBackground(grey);
  source.getRange(BOHStartRow, 1, 1, 2).setBackground(grey);
  
  master.hideSheet();
}


function editTemplate(){
  loading();
  let source = ssData.getSheetByName('Template Source');
  if( source == null ){
    setupTemplate();
    source = ssData.getSheetByName('Template Source');
  }
  let sourceName = source.getSheetName();
  let sValues = source.getDataRange().getValues();
  source.copyTo(ss);
  let target = ss.getSheetByName('Copy of '+ sourceName);
  target.getRange(1,1,sValues.length,sValues[0].length).setValues(sValues);
  let existingTemplateSheet = ss.getSheetByName('Template');
  if( existingTemplateSheet != null ){ ss.deleteSheet(existingTemplateSheet); }
  target.setName('Template');
  fixDateFormula(target);
  fixAlignment(target);
  ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheetByName('Template'));
  stopLoading();
}


function saveTemplate(){
  let ui = SpreadsheetApp.getUi();
  let validSheetName = 'Template';
  ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = SpreadsheetApp.getActive().getActiveSheet();;
  let sheetName = sheet.getName();
  // Check if on a valid sheet to use Override Template
  if( sheetName != validSheetName ){
    // If not, send error message and return
    getWrongSheetErrorMsg(validSheetName);
    return;
  }
  // vvvvvvvvvv ON VALID SHEET vvvvvvvvvv //
  let response = ui.alert('Override Template', 'Overriding Template will delete previous Template sheet. Proceeding with override...', ui.ButtonSet.OK_CANCEL);
  switch( response ){
    case ui.Button.CANCEL:
    case ui.Button.CLOSE:
      return;
      break;
    case ui.Button.OK:
      //CONTINUE BELOW
      break;
    default:
      break;
  }
  // vvvvvvvvvv OVERRIDE TEMPLATE vvvvvvvvvv //
  loading();
  let source = ss.getSheetByName('Template');
  let sourceName = source.getSheetName();
  let sValues = source.getDataRange().getValues();
  source.copyTo(ssData);
  let target = ssData.getSheetByName('Copy of '+ sourceName);
  target.getRange(1,1,sValues.length,sValues[0].length).setValues(sValues);
  let templateSourceSheetCheck = ssData.getSheetByName('Template Source');
  if( templateSourceSheetCheck != null ){ ssData.deleteSheet(templateSourceSheetCheck); }
  target.setName('Template Source');
  //ss.deleteSheet(source);
  stopLoading();
}


//function fixDateFormula(sheet){
//  var row = 0;
//  for( r = 1; r < sheet.getLastRow(); r++ ){
//    let value = sheet.getRange(r, 1).getValue();
////    Logger.log(value);
//    if( value == 'DATE' ){
////      Logger.log('Date found at row: ' + r);
//      row = r + 1;
//      break;
//    }
//  }
//  let range = sheet.getRange(row, 3, 1, 6);
//  range.setValue('=B' + row + '+1');
//  // Set protection on the formulas
//  /*
//  let protection = range.protect().setDescription('Date Formula Range');
//  protection.addEditor('BrianWMatejka@gmail.com');
//  if (protection.canDomainEdit()) {
//    protection.setDomainEdit(false);
//  }
//  */
//}