const cds=require('@sap/cds');

const express=require('express');
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
const mysql= require('mysql2')
// let dbClass = require('sap-hdbext-promisfied')
// let hana = require('@sap/hana-client');

// Modify the host IP and password based on your system information
let mycon = mysql.createConnection({
    host: 'localhost',
    port: `3306`,
   
    user: `root`,
    password: 'root',
    database:   `laptop_db`
})

module.exports=cds.service.impl(async function (){
    const {Laptop}=this.entities;
    console.log('Laptop',Laptop);
    let db=await cds.connect.to('db')
    this.on('*',Laptop,async req=>{
        console.log('Laptop');  
        console.log('db',db);
        let dbResult=await db.run(`SELECT * from('LaptopProject_db_Laptop')`);
        console.log('dbResult',dbResult);

        mycon.connect(function (err){

            if(err){
                console.error('err',err);
            }
            else{
                mycon.query(`SELECT * from laptop1`,function (err,result,fields){
                    console.log('result',result);
                });
                dbResult.forEach(async data=>{
                    let ID,Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt;
                                ID=data.ID;
                                console.log('new Date().getUTCDate();',new Date(data.createdAt));
                                // console.log('new Date().getUTCDate();',new Date().getVarDate());
                                console.log('new Date().getUTCDate();',new Date().getTime());
                                console.log('ID',ID);
                                Name=data.Name;
                                Descr=data.Descr;
                                IsActive=data.IsActive;
                                createdBy=data.createdBy;
                                createdAt=new Date(data.createdAt).toLocaleString('en-US').replace(',', '').replace(' PM', '').replaceAll('/', '-');
                                modifiedBy=data.modifiedBy;
                                modifiedAt=new Date(data.modifiedAt).toLocaleString('en-US').replace(',', '').replace(' PM', '').replaceAll('/', '-');
                    mycon.query(`INSERT INTO laptop1 set ID=${ID},Name='${Name}',Descr='${Descr}',IsActive='${IsActive}',createdBy='${createdBy}',createdAt='2024-01-24 11:28:16',modifiedBy='${modifiedBy}',modifiedAt=${modifiedAt}`,function (err,result,fields){
                        if(err){
                            console.error(err);
                        }
                        else{
                            console.log('result',result);
                            result.forEach(async element => {
                                console.log('element',element);
                                
                                
                            });
                        }
                    })
                })
                
                // console.log('query',query);
            }
        })
        // let qu=`SELECT * from laptop1`;
        // let result=cds.run(qu);
        // console.log(req.query);
        // result.forEach(element => {
        //     console.log('element',element);
        //     let ID,Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt;
        //     ID=element.ID;
        //     console.log('ID',ID);
        // });
        
        // db.tx(req).query(req.query);
    })
})


const LOG=cds.log("Mysql connection");

//get all the Laptops
app.get("/getlaptops", (request, response)=>{
	
    // const status = output;
    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            mycon.query(`SELECT * from laptop1 where IsActive=1`,function (err,result,fields){
                console.log('result',result);
                response.send(result);
            });
        }
    });

	
  });

  app.post('/postlaptop',async (req, res) => {
    try {
    // Handle the POST request
    console.log('req',req);
    console.log('res',res);
    const requestBody=await req.body; // Access the request body
    console.log('req.body',req.body);
    console.log('requestBody',requestBody);
    const responseData = { message: 'POST request received', data: requestBody };

    let { ID, Name, Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = req.body;
    console.log('ID',ID);
    console.log('Name',Name);
    console.log('Descr',Descr);
    console.log('IsActive',IsActive);
    console.log('createdBy',createdBy);
    createdAt=new Date(createdAt).toISOString().replace('Z','');
    console.log('createdAt',createdAt);
    console.log('modifiedBy',modifiedBy);
    // modifiedAt=dateConverter(modifiedAt);
    console.log('modifiedAt',modifiedAt);

    // const Emp=EMPLOYEENAME;
    // console.log('Emp',Emp);

    mycon.connect(async function (err){

        if(err){
            console.error('err',err);
        }
        else{
            mycon.query(`INSERT INTO laptop1 VALUES (${ID},'${Name}','${Descr}','${IsActive}','${createdBy}','${createdAt}','${modifiedBy}',${modifiedAt})`,function (err,result,fields){
                if(err){
                    console.error("error message:",err);
                    res.status(500).json({ error: 'Failed to insert data into MySQL', details: err });
                }
                else{
                    console.log('result',result);
                    // res.send(result);
                    LOG.info('Data inserted into MYSQL');
    
                    // res.status(201).json({ message: 'Data inserted into MYSQL' });

                    res.json(responseData); // Send a JSON response
                }
                
            });
    // const insertQuery = `INSERT INTO laptop_db.laptop1 VALUES (${ID},'${Name}','${Descr}','${IsActive}','${createdBy}','${createdAt}','${modifiedBy}','${modifiedAt}')`;
    
    
    
        }
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Post data' });
}
  });

  app.put("/updatelaptop", (request, response)=>{
	
    // const status = output;
    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            try{
            console.log('request',request);
            let { ID, Name, Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = request.body;
            console.log('ID',ID);
            console.log('Name',Name);
            console.log('Descr',Descr);
            console.log('IsActive',IsActive);
            console.log('createdBy',createdBy);
            createdAt=new Date(createdAt).toISOString().replace('Z','');
            console.log('createdAt',createdAt);
            modifiedAt=new Date(modifiedAt).toISOString().replace('Z','');
            console.log('modifiedBy',modifiedBy);
            // modifiedAt=dateConverter(modifiedAt);
            console.log('modifiedAt',modifiedAt);
            try{
            mycon.query(`UPDATE laptop1 SET Name='${Name}',Descr='${Descr}',createdBy='${createdBy}',createdAt='${createdAt}',modifiedBy='${modifiedBy}',modifiedAt='${modifiedAt}' where ID=${ID}`,function (err,result,fields){
                if(err){
                    console.error('errrr',err);
                }
                console.log('result',result);
                response.send(result);
            });
        }
        catch(err){
            console.error('error msg',err);
        }
        }
        catch(err){
            console.error('error occured',err);
        }
        }
    });

	
  });

  //delete
  app.delete("/deletelaptop", (request, response)=>{
	
    // const status = output;
    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            try{
                // let { ID, Name, Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = request.body;
                let [ID]=request.query.ID;
                console.log('request.params',request.params);
                console.log('request',request.query.ID);
                // console.log('ID2',ID2);
            console.log('ID',ID);
            mycon.query(`UPDATE laptop_db.laptop1 SET IsActive=0 where ID=${ID}`,function (err,result,fields){
                console.log('result',result);
                response.send(result);
            });
        }
        catch(err){
            console.error('error messages:',err);
        }
        }
    });

	
  });

  function dateConverter(timestamp){
    if(timestamp!=null){
        let dateobj=new Date(timestamp)
    //     let date=dateobj.getDate();
	// console.log('Date',date);
	// let month=dateobj.getMonth();
	// console.log('month',month);
	// let year=dateobj.getFullYear();
	// console.log('year',year);
	// let hrs=dateobj.getHours();
	// console.log('hrs',hrs);
	// let min=dateobj.getMinutes();
	// console.log('min',min);
	// let sec=dateobj.getSeconds();
	// console.log('sec',sec);
	// let dt2=year+'-'+month+'-'+date+' '+hrs+':'+min+':'+sec;
    // console.log('dt2',dt2);
    // return dt2;
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
      };
      
      let formattedDate = dateobj.toLocaleString('en-GB', options);
      
      console.log(formattedDate);
      return formattedDate;
    }
    else{
        return timestamp;
    }
  }
