function areThereHiddenSheets(){
  let sheets = ss.getSheets();
  for( i in sheets ){ if( sheets[i].isSheetHidden() ){ return true; } }
  return false;
}