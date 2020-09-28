import { getJsonDataString } from './data.js';

let fileInputEl;
let outputEl;
let filePickerSection;
let dataChart;
let bodyContent;
let mainDataObject; //main data structure to store excel data


//chart variables
let satLevelsArray = [];
let touchpointsArray= [];
let importanceArray = [];
let myLine;
let chartEl;

//column reading variables
let columnTableArray;
let columnKeywords;
let columnMainDatObj;

/** Function to initialize all Data and Charts */
function dataInit() {
  
  //var jsonString = localStorage.getItem("excelData");
  
  mainDataObject = getJsonDataString(); //get data from js/data.js script
  
  //variables used for row processing (data in chart)
  satLevelsArray = [];
  touchpointsArray= [];
  importanceArray = [];

  //variable used later for column data processing
  columnKeywords = ['TouchpointName', 'Stage', 'JourneyPhase', 'BrandImperative', 'SatisfactionLevel', 'Importance', 'SatisfactionLevelTooltip', 'ImportanceTooltip', 'Doing', 'Team', 'Tier1Tier3UseCase', 'ExistingWork', 'ResearchFindings1Header', 'ResearchFindings1Body', 'ResearchFindings2Header', 'ResearchFindings2Body', 'ResearchFindings3Header', 'ResearchFindings3Body', 'ResearchFindings4Header', 'ResearchFindings4Body', 'SupportingDataHeader', 'SupportingDataBody', 'Quotes', 'Opportunities', 'BehavioralTheoryHeader', 'BehavioralTheoryBody', 'BestPractices', 'ThirdParty1Header', 'ThirdParty1Body', 'ThirdParty2Header', 'ThirdParty2Body', 'ChannelPreference'];

  //keywords for row searching (data in chart)
  var satLevelKey = 'Satisfaction-Level';
  var touchpointsNamesKey = 'Touchpoint-Name';
  var importanceKey = 'Importance';

  var satLevelValues = mainDataObject.filter(function(i) {
    return i.Keyword === satLevelKey; //retrieves row with key-pairs containing keyword = 'Satisfaction-Level'
  });

  var touchpointsNamesValues = mainDataObject.filter(function(i) {
    return i.Keyword === touchpointsNamesKey; //retrieves row with key-pairs containing keyword = 'Touchpoint-Name'
  });

  var importanceValues = mainDataObject.filter(function(i) {
    return i.Keyword === importanceKey; //retrieves row with key-pairs containing keyword = 'Importance Values'
  });

  if(touchpointsNamesValues && touchpointsNamesValues[0]) {
    Object.keys(touchpointsNamesValues[0]).forEach(function(key) { //retrieves key values for Touchpoint-Names
      touchpointsArray.push(touchpointsNamesValues[0][key]);
    });
  }

  if(satLevelValues && satLevelValues[0]) {
    Object.keys(satLevelValues[0]).forEach(function(key) { //retrieves key values for Satisfaction-Levels
      satLevelsArray.push(satLevelValues[0][key]);
    });
  }

  if(importanceValues && importanceValues[0]) {
    Object.keys(importanceValues[0]).forEach(function(key) { //retrives key values for Importance
      importanceArray.push(importanceValues[0][key]);
    });
  }
/** Remove last element of Touchpoint Names, Satisfaction levels and Importance 
 * (because they're keywords not needed to display the chart) */
touchpointsArray.pop();
satLevelsArray.pop();
importanceArray.pop();

touchpointsArray = touchpointsArray.map(name => name.toUpperCase()); //set all Touchpoint Names to Uppercase
  

/** CHART CODE */

var ctx = document.getElementById("chart").getContext("2d");  

  var config = {
    type: 'line',
    data: {
      labels: touchpointsArray,
      datasets: [
        {
          label: "Satisfaction Levels",
          borderColor: '#8E1C2E', //color of the line in the graph
          pointBorderColor: '#103F48', //color of the borders of the points in the graph
          pointBackgroundColor: '#b3b3b3',
          pointHoverBackgroundColor: '#b3b3b3',
          pointHoverBorderColor: '#b3b3b3',
          pointBorderWidth: 1,
          pointHoverRadius: 3,
          pointHoverBorderWidth: 5,
          pointRadius: 3,
          borderWidth: 1.5,
          fill: true,
          hidden: false,
          data: satLevelsArray
        },
        {
          label: "Importance for Purchase",
          borderColor: '#B67367', //color of the line in the graph
          pointBorderColor: '#103F48', //color of the borders of the points in the graph
          pointBackgroundColor: '#b3b3b3',
          pointHoverBackgroundColor: '#b3b3b3',
          pointHoverBorderColor: '#b3b3b3',
          pointBorderWidth: 1,
          pointHoverRadius: 3,
          pointHoverBorderWidth: 5,
          pointRadius: 3,
          //backgroundColor: gradientFill,
          borderWidth: 1.5,
          fill: true,
          data: importanceArray
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title:{
        display:true,
        text:'', 
        fontColor: '#E7E7E7',
        fontFamily: 'MazdaRegular'
      },
      legend: {
        display: false
      },
      legendCallback: (chart) => {
        var legendHtml = [];
        for (var i=0; i<chart.data.datasets.length; i++) {
            //legendHtml.push('<div class="chart-legend" style="background-color:' + chart.data.datasets[i].backgroundColor + '"></div></td>');                    
            if (chart.data.datasets[i].label) {
                legendHtml.push('<a class="chart__legend--text" id="' + chart.id + '_' + chart.legend.legendItems[i].datasetIndex + '"><img class="chart__legend--img" src="images/chart_icon_' + [i] + '.svg">' + chart.data.datasets[i].label + '</a>');
            }
        }                                                                                  

        return legendHtml.join("");                                                        
      },           
      hover: {
        mode: 'index',
        intersect: false,
        onHover: function(e) {
          var point = this.getElementAtEvent(e);
          if (point.length) e.target.style.cursor = 'pointer';
          else e.target.style.cursor = 'default';
       }        
      },
      scales: {
        xAxes: [{
          display: true,
          position: 'top',    
          scaleLabel: {
            display: false
          },
          ticks:{
            fontFamily: 'MazdaRegular',
            fontColor: '#E7E7E7',
            fontSize: 10         
          }          
        }],
        yAxes: [{
          display: true,
          gridLines: { color: '#242414', 
          drawBorder: false
          },            
          scaleLabel: {
            display: false
          },
          ticks:{
            display:true,
            fontColor: '#101010',
          }
        }]
      }
    }
  };  
  
  myLine = new Chart(ctx, config);
  var legend = document.querySelector('.chart__legend');
  legend.innerHTML = myLine.generateLegend();  

  var legenTags = document.getElementsByClassName("chart__legend--text");
  var updateDataset = function(e) {
    var id = e.currentTarget.id;
    var index = id.split('_')[1];
    var chartId= id.split('_')[0];
    if (myLine.id == chartId) {
      var meta = myLine.getDatasetMeta(index);
      // See controller.isDatasetVisible comment
      meta.hidden = meta.hidden === null? !myLine.data.datasets[index].hidden : null;
  
      // We hid a dataset ... rerender the chart
      myLine.update();
    }
  }
  
  for (var i = 0; i < legenTags.length; i++) {
    legenTags[i].addEventListener('click', updateDataset, false);
  }  
}

/** COLUMN PROCESSING */
function updateColumnData(label) {
  const columns = label.split(',').map(col => col.trim());  
  //store data in hidden html temporarily //TODO: remove this step
  const html = json2html.transform(mainDataObject, {
    '<>': 'tr',
    'html': columns.map(col => `<td>\${${col}}</td>`).join('')
  });
  outputEl = document.getElementById('output');
  outputEl.innerHTML += html;

  columnTableArray = {}; //temporary array to store column data
  columnTableArray = [...document.querySelectorAll('table>*>tr')] // store column data into array
  .map(row => [...row.querySelectorAll('td,th')].map(cell => cell.innerText) );
  //console.log(columnTableArray);

  columnMainDatObj = {}; //this is the final Data Structure for the selected column data. Its a JSON/Javascript object
  columnKeywords.forEach((key, i) => columnMainDatObj[key] = columnTableArray[i]); //merge with keywords
  console.log(columnMainDatObj);

  //fill touchpoint data
  document.querySelector('.touchpoint__name--text').innerText = columnMainDatObj.TouchpointName;
  document.querySelector('.touchpoint__brand--text').innerText = columnMainDatObj.BrandImperative;
  document.querySelector( '.touchpoint__brand--journeytext').innerText = columnMainDatObj.JourneyPhase;
  document.querySelector('.touchpoint__customer--text').innerText = columnMainDatObj.Doing;
  
  document.querySelector('.touchpoint__tags-section--team-text').innerText = columnMainDatObj.Team;
  document.querySelector('.touchpoint__tags-section--tier-text').innerText = columnMainDatObj.Tier1Tier3UseCase;
  document.querySelector('.touchpoint__tags-section--alignment-text').innerText = columnMainDatObj.ExistingWork;
  
  document.querySelector('.touchpoint__insights--header').innerText = columnMainDatObj.ResearchFindings1Header;
  document.querySelector('.touchpoint__insights--content').innerText = columnMainDatObj.ResearchFindings1Body;
  document.querySelector('.touchpoint__insights2--header').innerText = columnMainDatObj.ResearchFindings2Header;
  document.querySelector('.touchpoint__insights2--content').innerText = columnMainDatObj.ResearchFindings2Body;
  document.querySelector('.touchpoint__insights3--header').innerText = columnMainDatObj.ResearchFindings3Header;
  document.querySelector('.touchpoint__insights3--content').innerText = columnMainDatObj.ResearchFindings3Body;  
  document.querySelector('.touchpoint__insights4--header').innerText = columnMainDatObj.ResearchFindings4Header;
  document.querySelector('.touchpoint__insights4--content').innerText = columnMainDatObj.ResearchFindings4Body;
  document.getElementById('insights-radio-1').checked = true; //show the ResearchFindings1 first


  document.querySelector('.touchpoint__opportunities--content').innerText = columnMainDatObj.Opportunities;
  document.querySelector('.touchpoint__quotes--content').innerText = columnMainDatObj.Quotes;
  document.querySelector('.touchpoint__bestpractices--content').innerText = columnMainDatObj.BestPractices;

  document.querySelector('.touchpoint__supportingdata--header').innerText = columnMainDatObj.SupportingDataHeader;
  document.querySelector('.touchpoint__supportingdata--content').innerText = columnMainDatObj.SupportingDataBody;

  document.querySelector('.touchpoint__thirdparty--header').innerText = columnMainDatObj.ThirdParty1Header;
  document.querySelector('.touchpoint__thirdparty--content').innerText = columnMainDatObj.ThirdParty1Body;
  document.querySelector('.touchpoint__thirdparty2--header').innerText = columnMainDatObj.ThirdParty1Header;
  document.querySelector('.touchpoint__thirdparty2--content').innerText = columnMainDatObj.ThirdParty1Body;
  document.getElementById('thirdparty-radio-1').checked = true; //show the ThirdParty1 first

  document.querySelector('.touchpoint__behavioral--header').innerText = columnMainDatObj.BehavioralTheoryHeader;
  document.querySelector('.touchpoint__behavioral--content').innerText = columnMainDatObj.BehavioralTheoryBody;    

  outputEl.innerHTML = '';
}

/** Functio to detect a click on the chart */
function clickColumnData(event) {
  var activePoint = myLine.getElementAtEvent(event);

  // make sure click was on an actual point
  if (activePoint.length > 0) {
    //var clickedDatasetIndex = activePoint[0]._datasetIndex;
    var clickedElementindex = activePoint[0]._index.toString();
    //var label = myLine.data.labels[clickedElementindex];
    //var value = myLine.data.datasets[clickedDatasetIndex].data[clickedElementindex];  
    //alert(label + " :: " + value);
    updateColumnData(clickedElementindex);

  }
}

window.onload = () => {
  //filePickerSection = document.getElementById('picker');
  dataChart = document.getElementById('data-chart');
  bodyContent = document.getElementById('touchpoint-content');
  //fileInputEl = document.getElementById('file-upload-field');
  chartEl = document.getElementById('chart');

  //fileInputEl.addEventListener('change', onUpload);
  chartEl.addEventListener('click', clickColumnData);
  dataInit();
  updateColumnData("0"); //Default View: Load data of first Touchpoint 
}






  

