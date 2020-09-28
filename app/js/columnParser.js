let fileInputEl;
let columnsEl;
let output;
let excelFile;
let reader;
let columnTableArray;
let columnKeywords;
let columnMainDatObj;

window.onload = () => {
  fileInputEl = document.getElementById('file-btn');
  columnsEl = document.getElementById('columns');
  outputEl = document.getElementById('output');
  fileInputEl.addEventListener('change', onUpload);
  columnsEl.addEventListener('click', onClick);
  columnsEl.addEventListener('keypress', onEnter);
}

function onClick(event) {
  if (!excelFile) {
    alert('You need to upload the Excel File first.');
    event.preventDefault();
  }
}

function onUpload(event) { 
    reader = new FileReader();
    excelFile = event.target.files[0];
}

function onEnter(event) {

  if(event.key === 'Enter') {
    const columns = columnsEl.value.split(',').map(col => col.trim());
    const tableHeader = columns.map(col => `<th>${col}</th>`).join('');
    
    outputEl.innerHTML = tableHeader;
    
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const workbook = XLSX.read(fileContent, { type: 'binary' });
      workbook.SheetNames.forEach(sheetname => {
        const data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetname]);
        
        const html = json2html.transform(data, {
          '<>': 'tr',
          'html': columns.map(col => `<td>\${${col}}</td>`).join('')
        });
        outputEl.innerHTML += html;
        console.log(outputEl);
        
        columnKeywords = ['id', 'TouchpointName', 'Stage', 'JourneyPhase', 'BrandImperative', 'SatisfactionLevel', 'Importance', 'SatisfactionLevelTooltip', 'ImportanceTooltip', 'Doing', 'Team', 'Tier1Tier3UseCase', 'ExistingWork', 'ResearchFindings1Header', 'ResearchFindings1Body', 'ResearchFindings2Header', 'ResearchFindings2Body', 'ResearchFindings3Header', 'ResearchFindings3Body', 'ResearchFindings4Header', 'ResearchFindings4Body', 'SupportingDataHeader', 'SupportingDataBody', 'Quotes', 'Opportunities', 'BehavioralTheoryHeader', 'BehavioralTheoryBody', 'BestPractices', 'ThirdParty1Header', 'ThirdParty1Body', 'ThirdParty2Header', 'ThirdParty2Body', 'ChannelPreference'];
        
        columnTableArray = [...document.querySelectorAll('table>*>tr')] // store column data into array
        .map(row => [...row.querySelectorAll('td,th')].map(cell => cell.innerText) );
      
        console.log(columnTableArray);

        columnMainDatObj = {}; //this is the final Data Structure for column data. Its a JSON/Javascript object
        columnKeywords.forEach((key, i) => columnMainDatObj[key] = columnTableArray[i]);
        console.log(columnMainDatObj);        

      });
    }
    
    reader.onerror = (error) => {
      console.log('Error', error);
    };
    
    reader.readAsBinaryString(excelFile);
  }  
}
