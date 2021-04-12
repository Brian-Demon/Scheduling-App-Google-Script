function updateTemplate(employee, addOrRemove){ // Called after adding or removing employees
  let sheet = ssData.getSheetByName(templateSourceSheetName);
  let templateRoster = getTemplateRoster();
  // @TODO: ADDING EMPLOYEES TWICE ON THE TEMPLATE FOR SOME REASON
  switch( addOrRemove.toUpperCase() ){
    case "ADD":
      let section = getTemplateNamesSection(employee.title);
      //  @TODO: Fix if the title is not found, do stuff
      let sectionNames = sheet.getRange(section.start, 1, section.difference, 1).getValues().flat();
      let employeeNameTitle = "";
      if( section.manager ){
        employeeNameTitle = employee.name + " (" + employee.title + ")";
      } else {
        employeeNameTitle = employee.name;
      }
      sectionNames.push(employeeNameTitle);
      sectionNames.sort();
      let insertRowPosition = 0;
      if( sectionNames.indexOf(employeeNameTitle) !== 0 ){
        insertRowPosition = sectionNames.indexOf(employeeNameTitle) - 1;
      }
      insertRowPosition += section.start;
      if( sectionNames[0] === employeeNameTitle ) insertRowPosition -= 1;
      sheet.insertRowAfter(insertRowPosition);
      sheet.getRange(insertRowPosition + 1, 1).setValue(employeeNameTitle);
      sheet.getRange(insertRowPosition + 1, 1, 1, 8).setBorder(true,true,true,true,true,true,black,solid).setBackground(white);
      break;
    case "REMOVE":
      for( let i in templateRoster ){
        // FIND AND DELETE EMPLOYEE BASED ON row PASSED BY getTemapletRoster()
        if( templateRoster[i].name === employee.name ){
          let lastRow = sheet.getLastRow();
          sheet.deleteRow(templateRoster[i].row);
          sheet.insertRowAfter(lastRow + 1);
        }
      }
      break;
    default:
      break;
  }
}


function loggerTemplateRoster(templateRoster){ // array of obj's
  for( let i in templateRoster ){
    Logger.log(`@i: ${i}, name: ${templateRoster[i].name}, title: ${templateRoster[i].title}, row: ${templateRoster[i].row}`);
  }
}