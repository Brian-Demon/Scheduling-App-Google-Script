function getColorName(hex){
  if( hex == '#ffffffff' ){ hex = '#ffffff'; }
  switch( hex ){
    case anyColor:
      return 'ANY';
      break;
    case offColor:
      return 'OFF';
      break;
    case openColor:
      return 'OPEN';
      break;
    case midColor:
      return 'MID';
      break;
    case closeColor:
      return 'CLOSE';
      break;
    case openMidColor:
      return 'OPEN/MID';
      break;
    case midCloseColor:
      return 'MID/CLOSE';
      break;
    case openCloseColor:
      return 'OPEN/CLOSE';
      break;
    case customAvail:
      return ' CUSTOM AVAILABILITY';
      break;
    case  red:
      return 'RED';
      break;
    case blue:
      return 'BLUE';
      break;
    case black:
      return 'BLACK';
      break;
    case grey:
      return 'GREY';
      break;
    case white:
      return 'WHITE';
      break;
    case purple:
      return 'PURPLE';
      break;
    case yellow:
      return 'YELLOW';
      break;
    case lightGreen2:
      return 'LIGHT GREEN 2';
      break;
    case lightPurple2:
      return 'LIGHT PURPLE 2';
      break;
    case lightBlue2:
      return 'LIGT BLUE 2';
      break;
    case lightRed2:
      return 'LIGHT RED 2';
      break;
    case lightOrange2:
      return 'LIGHT ORANGE 2';
      break;
    case magenta:
      return 'MAGENTA';
      break;
    case inventoryColor:
      return 'CYAN';
      break;
    case specialShiftColor:
      return 'ORANGE';
      break;
    default:
      return hex;
      break;
  }
}