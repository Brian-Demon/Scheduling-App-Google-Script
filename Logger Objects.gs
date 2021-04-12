function loggerRoster(r){
  let roster = r || getRosterArray();
  if( roster.length === 0 ) Logger.log("No one found on roster passed")
  for( let i in roster ){
    Logger.log(`@i: ${i} -- Name: ${roster[i].name}, Title: ${roster[i].title}`);
  }
}

function loggerTsInfo(){
  let tsInfo = getTsInfo();
  for( let i in tsInfo ){
    Logger.log('Timestamp: ' + tsInfo[i].timestamp);
    Logger.log('Row: ' + tsInfo[i].row);
  }
}