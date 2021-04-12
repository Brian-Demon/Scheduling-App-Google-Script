function getObjectArrayLogs(array) {
  for( let i in array ){
    Logger.log('@i: ' + i);
    Logger.log('Name: ' + array[i].name);
    Logger.log('Title: ' + array[i].title);
  }
}