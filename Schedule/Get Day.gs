function getDay(index){
  switch( index ){
    case 0:
      return 'MON';
      break;
    case 1:
      return 'TUE';
      break;
    case 2:
      return 'WED';
      break;
    case 3:
      return 'THU';
      break;
    case 4:
      return 'FRI';
      break;
    case 5:
      return 'SAT';
      break;
    case 6:
      return 'SUN';
      break;
    default:
      return 'NO DAY FOUND...';
      break;
  }
}