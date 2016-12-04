var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheetsCount = ss.getNumSheets();
var sheets = ss.getSheets();

function onOpen() { 
  // Try New Google Sheets method
  try{
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Spreadsheet Cleanup')
    .addItem('Show Sheets', 'showSheets')
    .addItem('Hide Sheets', 'hideSheets')
    .addItem('Delete Sheets', 'deleteSheets')
    .addItem('Copy Sheets', 'copySheets') 
    .addToUi(); 
  } 
  
  // Log the error
  catch (e){Logger.log(e)}
  
  // Use old Google Spreadsheet method
  finally{
    var items = [
      {name: 'Hide Sheets', functionName: 'hideSheets'},
      {name: 'Show Sheets', functionName: 'showSheets'},
      {name: 'Delete Sheets', functionName: 'deleteSheets'},
      {name: 'Copy Sheets', functionName: 'copySheets'},
    ];
      ss.addMenu('Spreadsheet Cleanup', items);
  }
}
      
function deleteSheets() {
  var deleteSheetsContaining = Browser.inputBox("Delete sheets with names containing:"); 
    if (sheetMatch(deleteSheetsContaining)){
      for (var i = 0; i < sheetsCount; i++){
        var sheet = sheets[i]; 
        var sheetName = sheet.getName();
        Logger.log(sheetName);
      if (sheetName.indexOf(deleteSheetsContaining.toString()) !== -1){
        Logger.log("DELETE!");
        ss.deleteSheet(sheet);
      }
    } 
  } else {
    noMatchAlert();
  }
}

function hideSheets() {
  var hideSheetsContaining = Browser.inputBox("Hide sheets with names containing:");
  if (sheetMatch(hideSheetsContaining)){
    for (var i = 0; i < sheetsCount; i++){
      var sheet = sheets[i]; 
      var sheetName = sheet.getName();
      Logger.log(sheetName); 
      if (sheetName.indexOf(hideSheetsContaining.toString()) !== -1){
        Logger.log("HIDE!");
        sheet.hideSheet();
      }
    }
  } else { 
    noMatchAlert();
  }
}

function showSheets() {
  var showSheetsContaining = Browser.inputBox("Show sheets with names containing:"); 
  if (sheetMatch(showSheetsContaining)){
    for (var i = 0; i < sheetsCount; i++){
      var sheet = sheets[i]; 
      var sheetName = sheet.getName();
      Logger.log(sheetName); 
      if (sheetName.indexOf(showSheetsContaining.toString()) !== -1){
        Logger.log("SHOW!");
        sheet.showSheet();
      }
    } 
  } else {
    noMatchAlert();
  }
}

function copySheets() {
  var copySheetsContaining = Browser.inputBox("Copy sheets with names containing:");
  var destinationId = Browser.inputBox("Enter the destination spreadsheet ID:");
  if (sheetMatch(copySheetsContaining)){
    for (var i = 0; i < sheetsCount; i++){
      var sheet = sheets[i]; 
      var sheetName = sheet.getName();
      Logger.log(sheetName); 
      if (sheetName.indexOf(copySheetsContaining.toString()) !== -1){
        Logger.log("COPY!");
        var destination = SpreadsheetApp.openById(destinationId);
        sheet.copyTo(destination);
      }
    }
    successAlert('copied')
  } else {
    noMatchAlert();
  }
}

// determine if any sheets match the user input
function sheetMatch(sheetMatch){
  for (var i = 0; i < sheetsCount; i++){
    var sheetName = sheets[i].getName(); 
    if (sheetName.indexOf(sheetMatch.toString()) !== -1){
      return true
    }
  }
  return false
}

// alert if no sheets matched the user input
function noMatchAlert() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
     'No Sheets Matched Your Input',
     "Try again and make sure you aren't using quotes.",
      ui.ButtonSet.OK);
}

// alert after succesful action (only used in copy)
function successAlert(action) {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
     'Success!',
     "You're sheets were " + action + " successfully.",
      ui.ButtonSet.OK);
}
