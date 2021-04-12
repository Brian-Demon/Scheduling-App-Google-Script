function getRosterArray() {
  organizeRoster();
  let sheet = rosterSourceSheet;
  let lastRow = sheet.getLastRow();
  let array = [];
  
  for( r = 1; r <=  lastRow; r++ ){
    let employee = new Object();
    employee.name = sheet.getRange(r, 1).getValue();
    employee.title = sheet.getRange(r, 2).getValue();
    array.push(employee);
  }
  return array;
}