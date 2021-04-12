function fixDateFormula(sheet){
  var row = 0;
  for( r = 1; r < sheet.getLastRow(); r++ ){
    let value = sheet.getRange(r, 1).getValue();
//    Logger.log(value);
    if( value === 'DATE' ){
//      Logger.log('Date found at row: ' + r);
      row = r + 1;
      break;
    }
  }
  let range = sheet.getRange(row, 3, 1, 6);
  range.setValue('=B' + row + '+1');
  // Set protection on the formulas
  /*
  let protection = range.protect().setDescription('Date Formula Range');
  protection.addEditor('BrianWMatejka@gmail.com');
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }
  */
}