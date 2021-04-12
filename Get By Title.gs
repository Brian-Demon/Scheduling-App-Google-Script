function getByTitle(roster, title){
  let employeesByTitle = [];
  for( let i in roster ){
    let titleFound = roster[i].title;
    if( titleFound === title ) employeesByTitle.push(roster[i]);
  }
  return employeesByTitle;
}