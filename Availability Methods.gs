// *************************************** //
// --  Acknowledge Updated Availability -- //
// *************************************** //
function acknowledgeUpdatedAvailability(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log(sheet.getSheetName());
  if(sheet.getSheetName() !== availabilitySheetName){
    ss.toast('You must be on the "Availability" tab');
    return;
  } else {
    let cell = sheet.getActiveCell();
    let row = cell.getRow();
    let color = getColorName(sheet.getRange(row, 2).getBackgrounds().flat()[0]);
    if( color === "YELLOW" ){
      sheet.getRange(row, 2).setBackground(resetColor);
      ss.toast("New availability acknowledged!");
    } else {
      ss.toast("No new availability found for selected person");
    }
  }
}

function oldAvailabilitySidebar(){
  organizeRoster();
  let ui = SpreadsheetApp.getUi();
  var oldAvailabilityForm = HtmlService.createHtmlOutputFromFile('Old Availability Sidebar').setTitle('View Old Availabilities');
  ui.showSidebar(oldAvailabilityForm);
}


function getOldAvailability(name){
  let ui = SpreadsheetApp.getUi();
  let sheet = oldAvailabilitiesSheet;
  let lastRow = sheet.getLastRow();
  if(lastRow === 1 ){
    noAvailability("");
    return;
  }
  let oldAvailabilities = [];
  let timestamps = [];
  for( let r = 2; r <=lastRow; r++ ){
    let value = sheet.getRange(r, 3).getValue();
    if( value === name ){
      let availabilityLine = sheet.getRange(r, 4, 1, 14).getValues().flat();
      timestamps.push(sheet.getRange(r, 1, 1, 1).getValue());
      oldAvailabilities.push(availabilityLine);
    }
  }
  // If no old availablity for name given, toast message as such
  if( oldAvailabilities.length === 0 ) noAvailability(name);
  
  // Display Old Availabilities
  for( let i = 0; i < oldAvailabilities.length; i++ ){
    let headerString = `Page ${i+1} of ${oldAvailabilities.length}:\r\n`;
    let day = ""
    Logger.log(timestamps[i]);
    let timestamp = convertTimestamp(timestamps[i]);
    Logger.log(timestamp)
    let availabilityString = `Submitted: ${timestamp}\r\n\r\nAvailability:\r\n`;
    let preferredString = "Preferred:\r\n";
    for( let j = 0; j < 7; j++ ){
      switch( j ){
        case 0:
          day = "Mon: ";
          break;
        case 1:
          day = "Tue: ";
          break
        case 2:
          day = "Wed: ";
          break
        case 3:
          day = "Thu: ";
          break
        case 4:
          day = "Fri: ";
          break
        case 5:
          day = "Sat: ";
          break
        case 6:
          day = "Sun: ";
          break
      }
      availabilityString += `${day}${oldAvailabilities[i][j]}, `;
//      Logger.log(`Availability: i: ${i}, ${day}${oldAvailabilities[i][j]}`);
    }
    for( let j = 7; j < 14; j++ ){
      switch( j ){
        case 7:
          day = "Mon: ";
          break;
        case 8:
          day = "Tue: ";
          break
        case 9:
          day = "Wed: ";
          break
        case 10:
          day = "Thu: ";
          break
        case 11:
          day = "Fri: ";
          break
        case 12:
          day = "Sat: ";
          break
        case 13:
          day = "Sun: ";
          break
      }
      preferredString += `${day}${oldAvailabilities[i][j]}, `;
//      Logger.log(`Preferred: i: ${i}, ${day}${oldAvailabilities[i][j]}`);
    }
    
    let response = ui.alert(`${headerString}`, `${availabilityString}\r\n${preferredString}\r\n`, ui.ButtonSet.OK_CANCEL);
    if( response !== ui.Button.OK ) return;
  }
}

function noAvailability(name){
  if(name === "") ss.toast(`No old availabilities on file`);
  else ss.toast(`No old availability found for ${name}`);
}