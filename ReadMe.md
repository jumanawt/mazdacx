Mazda CX Journey 2020

The application is coded in HTML, CSS, SCSS and Javascript. Data is retrieved from an external Excel spreadsheet by converting it into a Json object and using it in the code. The conversion can be done by any converter available online, I used this one in particular: 
http://beautifytools.com/excel-to-json-converter.php

All data is read from this Json object under the JS folder, then parsed and plotted into a chart by using ChartJS framework (http://chartjs.org/). Every click in the chart’s datapoints represents a data column retrieval. All information is properly styled and formatted to match the proposed data visualization design. 

Deploy to the server is made through FTP by connecting to server 10.11.1.97:21 and placing all code files in path= /home/mazdacx/public_html . Website is available at http://mazdacx.wundermanthompson.com
