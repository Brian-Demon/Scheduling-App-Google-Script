function organizeRoster() {
  let sheet = rosterSourceSheet;
  let lastRow = sheet.getLastRow();
  let titles = [];
  let names = [];
  // -- SORT BY NAMES -- //
  sheet.sort(1);
  // -- FILL ROSTER ARRAY WITH EMPLOYEE OBJECTS WITH KEYS: NAMES & TITLES -- //
  for( i = 1; i <= lastRow; i++ ){
    names.push(sheet.getRange(i, 1).getValue());
    titles.push(sheet.getRange(i, 2).getValue());
  }
  let FO = [];
  let GM = [];
  let AGM = [];
  let SL = [];
  let FOH = [];
  let BOH = [];
  let updatedTitles = [];
  let value = '';
  let pos = 0;
  for( pos in titles ){
    value = titles[pos];
    if( value == 'FO' ){
      FO.push(names[pos]);
      updatedTitles.push(titles[pos]);
    }
  }
  for( pos in titles ){
    value = titles[pos];
    if( value == 'GM' ){
      GM.push(names[pos]);
      updatedTitles.push(titles[pos]);
    }
  }
  for( pos in titles ){
      value = titles[pos];
      if( value == 'AGM' ){
        AGM.push(names[pos]);
        updatedTitles.push(titles[pos]);
      }
    }
  for( pos in titles ){
    value = titles[pos];
    if( value == 'SL' ){
      SL.push(names[pos]);
      updatedTitles.push(titles[pos]);
    }
  }
  for( pos in titles ){
    value = titles[pos];
    if( value == 'FOH' ){
      FOH.push(names[pos]);
      updatedTitles.push(titles[pos]);
    }
  }
  for( pos in titles ){
    value = titles[pos];
    if( value == 'BOH' ){
      BOH.push(names[pos]);
      updatedTitles.push(titles[pos]);
    }
  }
  /*
  Logger.log(updatedTitles.toString());
  
  Logger.log('Names: ' + names.toString());
  Logger.log('Titles: ' + titles.toString());
  Logger.log('FO: ' + FO.toString());
  Logger.log('GM: ' + GM.toString());
  Logger.log('AGM: ' + AGM.toString());
  Logger.log('SL: ' + SL.toString());
  Logger.log('FOH: ' + FOH.toString());
  Logger.log('BOH: ' + BOH.toString());
  */
  staff = [];
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
  //Logger.log('Staff: ' + staff.toString());
  // -- CLEAR SHEET AND UPDATE -- //
  sheet.clear();
  for( i = 0; i < staff.length; i++ ){
    sheet.getRange(i + 1, 2).setValue(updatedTitles[i]);
    sheet.getRange(i + 1, 1).setValue(staff[i]);
  }
}