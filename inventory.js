//WPUNJ IRT Invetory Log
//Justin Chudley

/*
   This function shouldn't need editing ever.
   The CSV file format has been standard for a long time,
   And this function has been written to cover all modern Browsers.
   Unless some new JS browser requirements come out, leave this function
   alone!!
*/
function exportToCsv(filename, rows)
{
   var processRow = function (row) {
       var finalVal = '';
       for (var j = 0; j < row.length; j++) {
           var innerValue = row[j] === null ? '' : row[j].toString();
           if (row[j] instanceof Date) {
               innerValue = row[j].toLocaleString();
           };
           var result = innerValue.replace(/"/g, '""');
           if (result.search(/("|,|\n)/g) >= 0)
               result = '"' + result + '"';
           if (j > 0)
               finalVal += ',';
           finalVal += result;
       }
       return finalVal + '\n';
   };

   var csvFile = '';
   for (var i = 0; i < rows.length; i++) {
       csvFile += processRow(rows[i]);
   }

   var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
   if (navigator.msSaveBlob) { // IE 10+
       navigator.msSaveBlob(blob, filename);
   }
   else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
           // Browsers that support HTML5 download attribute
           var url = URL.createObjectURL(blob);
           link.setAttribute("href", url);
           link.setAttribute("download", filename);
           link.style.visibility = 'hidden';
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
       }
   }
}



function getCSVformat()
{
  //As of Nov. 6th 2018 the following arrays are the current items kept in invetory
  var printerModel =
  [
    'Printer Model', 'HP LaserJet 500 colorMFP M575','HP LaserJet 500 color MFP M575',
    'HP LaserJet 500 color MFP M575','HP LaserJet 500 color MFP M575',
    'HP LaserJet 500 color MFP M575','HP LaserJet 500 color MFP M575',
    'HP LaserJet 500 color MFP M575', 'HP Color LaserJet MFP M680',
    'HP Color LaserJet MFP M680','HP Color LaserJet MFP M680',
    'HP Color LaserJet MFP M680','HP Color LaserJet MFP M680',
    'HP Color LaserJet MFP M680','HP Color LaserJet MFP M680',
    'HP Color LaserJet EnterPrise MFP M681','HP Color LaserJet EnterPrise MFP M681',
    'HP Color LaserJet EnterPrise MFP M681','HP Color LaserJet EnterPrise MFP M681',
    'HP Color LaserJet EnterPrise MFP M681','HP Color LaserJet EnterPrise MFP M681',
    'HP Color LaserJet EnterPrise MFP M681','HP Color LaserJet EnterPrise MFP M681',
    'HP Color LaserJet EnterPrise MFP M681','HP Color LaserJet EnterPrise MFP M681',
    'HP LaserJet M806 (Black only)','HP LaserJet MFP M725  (Ben Shahn only)'
  ]

  var partNumber =
  [
    'Part Number (Needed to Order)','CE402A','CE401A','CE403A','CE400X','CE254A',
    'CD644-67908','CE484A','CF322A','CF321A','CF323A','CF320X','CE265A','CE249A',
    'CE246A', 'CF452A','CF472X','CF451A','CF471X', 'CF453A','CF473X','CF470X',
    'P1B94A','P1B93A','P1B91A','CF325X','CF214X'
  ]

  var itemType =
  [
    'Item Type','507A Yellow','507A Cyan', '507A Magenta', '507X Black',
    'Toner Collection Unit','Intermediate Transfer Belt','Fuser Kit','653A Yellow',
    '653A Cyan', '653A Magenta', '653X Black','Toner Collection Unit',
    'Image Transfer Kit', 'Fuser Kit', '655A Yellow', '657X Yellow', '655A Cyan',
    '657X Cyan', '655A Magenta','657X Magenta', '657X Black', 'Toner Collection Unit',
    'Image Transfer Kit', 'Fuser (Maintenance) Kit', '25X Black', '14X Black',
    'Boxes of Paper'
  ]

  var IRT =
  ['Library IRT',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  var refOffice =
  ['Library Reference Office',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  var VR =
  ['Valley',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  var SE =
  ['Science',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  var total=
  ['Total',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  /*
    Create a 2D array to hold each of the arrays above
    The format of the CSV file in 2D array for is as follows:
    [
     [ROW 1],
     [ROW 2],
     [ROW 3], ...
     [ROW N]
    ]
    Where 'N' is some number = the last row.
    Each 'push' statement in the for loop below creates a new column.
  */
  var csvArr =
  [
   [printerModel[0],partNumber[0],itemType[0],IRT[0],refOffice[0],VR[0],SE[0],total[0]]
  ]

  for (var i=1; i < printerModel.length; i++){
    csvArr.push([ printerModel[i],partNumber[i],itemType[i],IRT[i],refOffice[i],VR[i],SE[i],total[i] ])
  }

  return csvArr;
}

function generateCSV()
{
  exportToCsv('inventory.csv',getCSVformat()) //Get the format for the CSV, then create and dowload the CSV
}

generateCSV()
