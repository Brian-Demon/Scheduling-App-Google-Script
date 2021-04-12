function getTsInfoTimestamps() {
  let tsInfo = getTsInfo();
  var tsInfoTimestamps = [];
  for( let i in tsInfo ){
    tsInfoTimestamps.push(tsInfo[i].timestamp);
  }
  //Logger.log(tsInfoTimestamps.toString());
  return tsInfoTimestamps;
}


function getTsInfoRows() {
  let tsInfo = getTsInfo();
  var tsInfoRows = [];
  for( let i in tsInfo ){
    tsInfoRows.push(tsInfo[i].row);
  }
  //Logger.log(tsInfoRows.toString());
  return tsInfoRows;
}