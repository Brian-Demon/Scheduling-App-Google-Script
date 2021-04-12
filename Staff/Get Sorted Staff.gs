function getSortedStaff() {
  let sheet = rosterSourceSheet;
  let lastRow = sheet.getDataRange().getLastRow();
  // -- SORT BY NAMES -- //
  sheet.sort(1);
  // -- FILL ROSTER ARRAY WITH EMPLOYEE OBJECTS WITH KEYS: NAMES & TITLES -- //
  let roster = getRosterArray();
  let FO = [];
  let GM = [];
  let AGM = [];
  let SL = [];
  let FOH = [];
  let BOH = [];
  //let updatedTitles = [];
  for( let i in roster ){
    if( roster[i].title == 'FO' ){ FO.push(roster[i]); }
  }
  for( let i in roster ){
    if( roster[i].title == 'GM' ){ GM.push(roster[i]); }
  }
  for( let i in roster ){
    if( roster[i].title == 'AGM' ){ AGM.push(roster[i]); }
  }
  for( let i in roster ){
    if( roster[i].title == 'SL' ){ SL.push(roster[i]); }
  }
  for( let i in roster ){
    if( roster[i].title == 'FOH' ){ FOH.push(roster[i]); }
  }
  for( let i in roster ){
    if( roster[i].title == 'BOH' ){ BOH.push(roster[i]); }
  }
  //getObjectArrayLogs(roster);
  /*
  Logger.log('FO: ' + FO.toString());
  Logger.log('GM: ' + GM.toString());
  Logger.log('AGM: ' + AGM.toString());
  Logger.log('SL: ' + SL.toString());
  Logger.log('FOH: ' + FOH.toString());
  Logger.log('BOH: ' + BOH.toString());
  */
  let staff = [];
  while( FO.length > 0 ){
    staff.push(FO[0]);
    FO.shift();
  }
  while( GM.length > 0 ){
    staff.push(GM[0]);
    GM.shift();
  }
  while( AGM.length > 0 ){
    staff.push(AGM[0]);
    AGM.shift();
  }
  while( SL.length > 0 ){
    staff.push(SL[0]);
    SL.shift();
  }
  while(FOH.length > 0 ){
    staff.push(FOH[0]);
    FOH.shift();
  }
  while( BOH.length > 0 ){
    staff.push(BOH[0]);
    BOH.shift();
  }
  //getObjectArrayLogs(staff);
  return staff;
}
