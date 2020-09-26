const csvFilePath='./rawData/complete.csv'
const csv=require('csvtojson')

const converter = require('json-2-csv');
const fs = require('fs');
const { title } = require('process');
const date = require('date-and-time');

const now = new Date();
const timeNow = date.format(now, 'YYYY/MM/DD HH:mm:ss');



csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    dataObjArray = [];
         for (let i=0; i<jsonObj.length; i++){
         let dateTime = (jsonObj[i].datetime).split(" ")
         dataObj = {
             "id": i+1,
             "Date": dateTime[0],
             "Time": dateTime[1],
             "City": titleCase(jsonObj[i].city),
             "State": titleCase(jsonObj[i].state),
             "Country": titleCase(jsonObj[i].country),
             "Shape": titleCase(jsonObj[i].shape),
             "Duration": jsonObj[i]['duration (seconds)'],
             "Description": jsonObj[i].comments,
             "DatePosted": jsonObj[i]['date posted'],
             "Latitude": jsonObj[i].latitude,
             "Longitude": jsonObj[i].longitude,
             "createdAt": timeNow,
             "updatedAt": timeNow
         };
       dataObjArray.push(dataObj);     
     }  
        console.log(dataObjArray)  
        converter.json2csv(dataObjArray, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFileSync('./output/sanitized.csv', csv);
        });
})

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);   
    return splitStr.join(' '); 
 }
}

