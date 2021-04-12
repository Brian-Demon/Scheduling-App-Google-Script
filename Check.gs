function check(avail, sched){
  if( sched === offColor || sched === white ){ return false; }
  switch( avail ){
    case anyColor:
      return false;
      break;
    case offColor:
      if( sched !== offColor ){ return true; }
      else{ return false; }
      break;
    case openColor:
      if( sched !== openingColor ){ return true; }
      else{ return false; }
      break;
    case midAvailColor:
      if( sched !== midColor ){ return true; }
      else{ return false; }
      break;
    case closeColor:
      if( sched !== closingColor ){ return true; }
      else{ return false; }
      break;
    case openMidColor:
      if( sched !== openingColor && sched !== midColor ){ return true; }
      else{ return false; }
      break;
    case midCloseColor:
      if( sched !== midColor && sched !== closingColor ){ return true; }
      else{ return false; }
      break;
    case openCloseColor:
      if( sched !== openingColor && sched !== closingColor ){ return true; }
      else{ return false; }
      break;
    default:
      break;
  }
  return true;
}