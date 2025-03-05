const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '',
	port:'',
    user: '',
    password: '',
    database: ''
  })
  
    app.use(cors());

  var bodyParser = require("body-parser");

  //app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

app.listen(port, ()=> console.log("server is online"));

app.get("/MGH", (req, res)=>{
	
	var query = `select CONCAT(hperson.patlast,", ",hperson.patfirst," ",hperson.patmiddle) AS Fullname, DATE_FORMAT(hdocord.dodtepost, '%Y-%m-%d') as dateMGH from hdocord inner join 
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