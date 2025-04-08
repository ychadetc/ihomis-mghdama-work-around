const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '192.168.250.10',
	port:'3307',
    user: 'root',
    password: 'R00t',
    database: 'hospital_dbo'
  })
  
    app.use(cors());

  var bodyParser = require("body-parser");

  //app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

app.listen(port, ()=> console.log("server is online"));

app.get("/MGH", (req, res)=>{

  var query = `select hdocord.hpercode as healthno, CONCAT(hperson.patlast,", ",hperson.patfirst," ",IFNULL(hperson.patmiddle, "N/A")) AS Fullname, DATE_FORMAT(hdocord.dodtepost, '%Y-%m-%d') as dateMGH from hdocord inner join 
	             hperson on hperson.hpercode = hdocord.hpercode 
	             where orcode = 'DISCH'`;
	
	
	
	connection.query(query, (err, results)=>{
		
		console.log(results);
		
		if (err) {
        console.error('error running query:', err);
        return;
      }
	  
	  res.send({mghData:results})
		
	});
	
});


app.get("/dispo", (req, res)=>{

  var query = `select hperson.hpercode as healthno, concat(hperson.patlast,", ", hperson.patfirst," ", hperson.patmiddle) as fullname, DATE_FORMAT(hadmlog.disdate, '%Y-%m-%d') as DateDisposition, hadmlog.dispcode from hadmlog inner join 
  hperson on hperson.hpercode = hadmlog.hpercode 
  where hadmlog.dispcode = 'DIEDD' or hadmlog.dispcode = 'DAMA'`;
	
	
	
	connection.query(query, (err, results)=>{
		
		console.log(results);
		
		if (err) {
        console.error('error running query:', err);
        return;
      }
	  
	  res.send({disData:results})
		
	});
	
});