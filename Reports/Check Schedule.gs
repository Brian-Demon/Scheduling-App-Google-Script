function checkSchedule(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = SpreadsheetApp.getActive().getActiveSheet();;
//  let sheet = ss.getSheetByName("Jan 11 - Jan 17");
  let sheetName = sheet.getName();
  let testSheet = ssData.getSheetByName('TEST');
  if( testSheet === null ){
    ssData.insertSheet('TEST');
    testSheet = ssData.getSheetByName('TEST');
  }
  testSheet.clear();
//  Logger.log(sheetName);
  
  loading();
  let startColumn = getStartColumn(sheet);
  let currentRoster = getRosterNames();
  let lastRow = sheet.getLastRow();
  let range = findMonday(sheet);
  let row = range.getRow() + 2;
  let column = range.getColumn();
  let numCol = column + 5;
  let delta = 0;
  let names = [];
  let lines = [];
  for( r = row; r <= lastRow; r++ ){
    let value = sheet.getRange(r, startColumn).getValue();
    if( value !== 'MANAGERS' && value !== 'FOH' && value !== 'BOH' ){
      let temp = value.split(' ');
      let name = temp[0];
      let line = [];
      for( c = column; c <= column + 6; c++ ){
        line.push(sheet.getRange(r, c).getBackground());
      }
      names.push(name);
      lines.push(line);
    }
  }
  // POPULATE THE TEST SHEET WITH SCHEDULE NAMES AND COLORS
  for( i = 0; i < lines.length; i++ ){
    testSheet.getRange(1 + i, 1).setValue(names[i]);
    for( j = 0; j < 7; j++ ){
      testSheet.getRange(1 + i, 2 + j).setValue(lines[i][j]);
    }
  }
  
  let availNames = getAvailNames();
  
  lastRow = testSheet.getLastRow();
  for( let r = 1; r <= lastRow; r++ ){
    let name = testSheet.getRange(r, 1).getValue();
    if( currentRoster.indexOf(name) !== -1 ){
      var availLine = getAvailLine(name);
      var prefLine = getPrefLine(name);
    } else {
      availLine = [];
      prefLine = [];
      var notOnRoster = true;
    }
//    Logger.log("r: " + r);
//    Logger.log("availLine: " + availLine.toString());
//    Logger.log("prefLine: " + prefLine.toString());
    
    // v----------------------------------------------------------------------------> GET AVAILABILITY REPORT
    if( availLine.length === 0 ){
      let string = "";
      if( notOnRoster ){
        string = name + ': // NEEDS TO BE ADDED TO ROSTER!!!';
      } else {
        string = name + ': // ' + noAvailString + '\r\n';
      }
      availReports.push(string);
    }
    else{
      let line = [];
      for( let c = 2; c <= 8; c++ ){
        let value = testSheet.getRange(r, c).getValue()
        line.push(value);
      }
      for( let i = 0; i < availLine.length; i++ ){
        let cantWork = check(availLine[i], line[i]);
        if( cantWork == true ){
          let sched = getColorName(line[i]);
          let avail = getColorName(availLine[i]);
          let day = getDay(i);
          if( sched === "CYAN" || sched === "ORANGE" ) continue;
//          Logger.log(name + ': // Day: ' + day + ' // Available: ' + avail + '(' + availLine[i] + ') // Scheduled: ' + sched + ' (' + line[i] + ')\r\n');
          let string = name + ': // Day: ' + day + ' // Available: ' + avail + ' // Scheduled: ' + sched + '\r\n';
          availReports.push(string);
        }
      }
    }
    
    // v----------------------------------------------------------------------------> GET PREFERRED AVAILABILITY REPORT
    if( prefLine.length == 0 ){
      let string = "";
      if( notOnRoster ){
        string = name + ': // NEEDS TO BE ADDED TO ROSTER!!!';
      } else {
        string = name + ': // ' + noAvailString + '\r\n';
      }
      prefReports.push(string);
    }
    else{
      let line = [];
      for( let c = 2; c <= 8; c++ ){
        let value = testSheet.getRange(r, c).getValue()
        line.push(value);
      }
      for( let i = 0; i < prefLine.length; i++ ){
        let cantWork = check(prefLine[i], line[i]);
        if( cantWork == true ){
          let sched = getColorName(line[i]);
          let avail = getColorName(prefLine[i]);
          let day = getDay(i);
          if( sched === "CYAN" || sched === "ORANGE" ) continue;
//          Logger.log(name + ': // Day: ' + day + ' // Preferred: ' + avail + '(' + availLine[i] + ') // Scheduled: ' + sched + ' (' + line[i] + ')\r\n');
          let string = name + ': // Day: ' + day + ' // Preferred: ' + avail + ' // Scheduled: ' + sched + '\r\n';
          prefReports.push(string);
        }
      }
    }
  }
  stopLoading();
}