function getRosterNames() {
  let roster = getRosterArray();
  let rosterNames = [];
  for( let i in roster ){ rosterNames.push(roster[i].name); }
  //Logger.log(rosterNames.toString());
  return rosterNames;
}

function getRosterTitles() {
  let roster = getRosterArray();
  let rosterTitles = [];
  for( let i in roster ){ rosterTitles.push(roster[i].title); }
  //Logger.log(rosterNames.toString());
  return rosterTitles;
}