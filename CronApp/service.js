const cds = require('@sap/cds');
const express = require('express');
const app = express();
app.use(express.json());
const cron = require('node-cron');
let mysql =require('mysql2');

// Reference HANA driver in the Node app and update the connection details
let dbClass = require('sap-hdbext-promisfied')
let hana = require('@sap/hana-client');

// Hana Configuration which is in VM Ware
let hanaConfig = {
    host: '192.168.0.219',
    port: `39013`,
    sslValidateCertificate: false,
    encrypt: true,
    user: `KARTHIKEYAN`,
    password: 'Ladera123'
}

// Mysql configuration which is installed locally 
let mycon = mysql.createConnection({
    host: 'localhost',
    port: `3306`,
   
    user: `root`,
    password: 'root',
    database:   `laptop_db`
})

const LOG=cds.log("HANA ON PREMISE ");

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/fetchData', async (req, res) => {
    try {
        console.log('req',req);
        const Laptop = await intro(req, res); // Call the intro function to fetch data
        console.log('Laptop',Laptop);
        res.json(Laptop); // Send the fetched data as JSON response
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Execute the query and output the results
async function intro(req,res) {
    try {
        let db = new dbClass(await dbClass.createConnection(hanaConfig))
        let rows = await db.execSQL("select * from KARTHIKEYAN.LAPTOP1 where ISACTIVE=true");
        LOG.info("Data fetched from HANA ", rows);
        return rows;
    } catch (error) {
        return console.error(error)
    }
}

//posting data one at a time to VMWare Hana database
cron.schedule('32 * * * *', async() => {
    let output;
// app.post('/postData',async (req, res) => {
    try {

        //get all the Laptops from mysql
    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            let dateobj=new Date();
                let date=dateobj.getDate();
	console.log('Date',date);
	let month=dateobj.getMonth();
	console.log('month',month);
	let year=dateobj.getFullYear();
	console.log('year',year);
	let hrs=dateobj.getHours()-2;
	console.log('hrs',hrs);
	let min=dateobj.getMinutes();
	console.log('min',min);
	let sec=dateobj.getSeconds();
	console.log('sec',sec);
	let dt2=new Date(year,month,date,hrs,min,sec).toISOString();
    console.log('dt2',dt2);
            
            mycon.query(`SELECT * from laptop1 where IsActive=1 and CREATEDAT>'${dt2}'`,async function (err,result,fields){
                console.log('result',result);
                // response.send(result);
                output=await result;
                console.log('output',output);
                const db = new dbClass(await dbClass.createConnection(hanaConfig));
                result.forEach(async element => {
                    let bool;
                    let { ID,Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = element;
                    if(IsActive==0){
                        bool=false;
                    }
                    else{
                        bool=true;
                    }
                console.log('ID',ID);
                console.log('Name',Name);
                console.log('Descr',Descr);
                console.log('IsActive',IsActive);
                console.log('bool',bool);
                console.log('createdBy',createdBy);
                // createdAt='2024-01-23 12:08:38.123'
                createdAt=createdAt.toISOString().replace('.00Z','').replace('T',' ');;
                // createdAt=`2024-01-23 12:08:38.123`;
            console.log('createdAt',createdAt);
                // console.log('createdAt',createdAt2);
                console.log('modifiedBy',modifiedBy);
                console.log('modifiedAt',modifiedAt);

                
                try{
                
                let insertQuery;
                if(modifiedAt==null){
                    insertQuery = `INSERT INTO KARTHIKEYAN.LAPTOP1 (ID,NAME,DESCR,ISACTIVE,CREATEDBY,CREATEDAT,MODIFIEDBY) VALUES (${ID},'${Name}','${Descr}',${bool},'${createdBy}','${createdAt}','${modifiedBy}')`;
            
                }
                else{
                insertQuery = `INSERT INTO KARTHIKEYAN.LAPTOP1 (ID,NAME,DESCR,ISACTIVE,CREATEDBY,CREATEDAT,MODIFIEDBY,MODIFIEDAT) VALUES (${ID},'${Name}','${Descr}',${bool},'${createdBy}','${createdAt}','${modifiedBy}','${modifiedAt}')`;
                }
                // await db.execSQL(insertQuery);
                // let addBatch=db.addBatch(insertQuery);
                // console.log('addBatch',addBatch);
                }
                catch(err){
                    console.log('error message:',err);
                }
                });
                // Execute the batch
                // const finalResults = await db.executeBatch();
                // console.log('finalResults',finalResults);

            });
        }
    });

    
        LOG.info('Data inserted into HANA');
    
    // res.status(201).json({ message: 'Data inserted into HANA' });

    // res.json(responseData); // Send a JSON response
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Post data' });
}
  });

  //posting bulk data at a time to VMWare Hana database
cron.schedule('50 * * * * *', async() => {
    let output;
// app.post('/postData',async (req, res) => {
    try {

        //get all the Laptops from mysql
    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            let dateobj=new Date();
                let date=dateobj.getDate();
	console.log('Date',date);
	let month=dateobj.getMonth();
	console.log('month',month);
	let year=dateobj.getFullYear();
	console.log('year',year);
	let hrs=dateobj.getHours()-2;
	console.log('hrs',hrs);
	let min=dateobj.getMinutes();
	console.log('min',min);
	let sec=dateobj.getSeconds();
	console.log('sec',sec);
	let dt2=new Date(year,month,date,hrs,min,sec).toISOString();
    console.log('dt2',dt2);
            
            mycon.query(`SELECT * from laptop1 where IsActive=1 and CREATEDAT>'${dt2}'`,async function (err,result,fields){
                console.log('result',result);
                // response.send(result);
                output=await result;
                console.log('output',output);
                let hanaconn = hana.createConnection();
                const db = new dbClass(await dbClass.createConnection(hanaConfig));
                // console.log('db',db);
                
                try {
                    // Prepare a SQL statement (use placeholders for parameters)
                    const sqlStatement = `INSERT INTO LAPTOP1 (ID, Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt) VALUES (?,?,?,?,?,?,?,?);`;
                    // let Lap=[{ ID:201, Name:'Wuthering Heights' ,Descr:'ssa',IsActive:true,createdBy:'me',createdAt:'2024-01-30 00:00:16.000',modifiedBy:'me',modifiedAt:'2024-01-30 00:00:16.000'}
                    
                //  ];
                    // const sqlStatement=`UPSERT (${Lap}) .into(LAPTOP1)`;
                  console.log('sqlStatement',sqlStatement);
                    // Prepare statement
                    const statement = await db.preparePromisified(sqlStatement);
                    console.log('statement',statement);

                    //Right now it is used to get each records and change the IsActive datatype to boolean
                    let valuesClauses = result.map(record => {
                        //to convert all 0, 1 to true, false
                            if(record.IsActive==0){
                                record.IsActive=false;
                                console.log('record.IsActive',record.IsActive);
                            }
                            else{
                                record.IsActive=true;
                                console.log('record.IsActive',record.IsActive);
                            }
                            if(record.createdAt!=null){
                            record.createdAt=record.createdAt.toISOString().replace('.00Z','').replace('T',' ');;
                            console.log('record.createdAt',record.createdAt);
                            }
                            if(record.modifiedAt!=null){
                            record.modifiedAt=record.modifiedAt.toISOString().replace('.00Z','').replace('T',' ');;
                            console.log('record.modifiedAt',record.modifiedAt);
                            }
                            // if(record.modifiedAt==null){
                            //     return `[${record.ID}, '${record.Name}', '${record.Descr}', ${record.IsActive}, '${record.createdBy}', '${record.createdAt}', '${record.modifiedBy}',null]`;
                         
                            // }
                            // else{
                            //     return `[${record.ID}, '${record.Name}', '${record.Descr}', ${record.IsActive}, '${record.createdBy}', '${record.createdAt}', '${record.modifiedBy}', '${record.modifiedAt}]`;
                         
                            // }
                             });

                    // Array of records to insert
    // const records = [
    //     [11, 'Laptop1', 'Description1', true, 'User1', '2024-01-24 11:28:16', 'User1', '2024-01-24 11:28:16'],
    //     [12, 'Laptop2', 'Description2', true, 'User2', '2024-01-24 11:30:00', 'User2', '2024-01-24 11:30:00'],
    //     // Add more records as needed
    // ];   
                  
                    // Provide values for the placeholders (parameterized query)
                    // const parameters = result;
                    // const parameters =valuesClauses;
                    // const parameters =Object.values();
                    const parameters =result.map(obj => Object.values(obj));
                    console.log('parameters',parameters);
                  
                    // Execute the statement with parameters
                    const resultSet = await db.statementExecBatchPromisified(statement, parameters);
                    // const resultSet = await db.statementExecPromisified(statement, records);
                  
                    // Log or process the result set
                    console.log('resultSet',resultSet);
                  
                  } catch (error) {
                    console.error('Error executing SQL statement:', error);
                  }
                //   finally {
                //     // Release the prepared statement
                //     // await statement?.drop();
                //     // Don't forget to close the database connection when done
                //     await db.disconnect();
                //   }
                
                // Generate the VALUES clauses for each record
// const valuesClauses = result.map(record => {
//     if(record.IsActive==0){
//         record.IsActive=false;
//         console.log('record.IsActive',record.IsActive);
//     }
//     else{
//         record.IsActive=true;
//         console.log('record.IsActive',record.IsActive);
//     }
//     if(record.createdAt!=null){
//     record.createdAt=record.createdAt.toISOString().replace('.00Z','').replace('T',' ');;
//     console.log('record.createdAt',record.createdAt);
//     }
//     if(record.modifiedAt!=null){
//     record.modifiedAt=record.modifiedAt.toISOString().replace('.00Z','').replace('T',' ');;
//     console.log('record.modifiedAt',record.modifiedAt);
//     }
//     if(record.modifiedAt==null){
//         return `('${record.ID}', '${record.Name}', '${record.Descr}', ${record.IsActive}, '${record.createdBy}', '${record.createdAt}', '${record.modifiedBy}',null)`;
 
//     }
//     else{
//         return `('${record.ID}', '${record.Name}', '${record.Descr}', ${record.IsActive}, '${record.createdBy}', '${record.createdAt}', '${record.modifiedBy}', '${record.modifiedAt}')`;
 
//     }
//      });

//                 // Build the SQL statement with multiple VALUES clauses
//                 let sqlStatement;
               
//                     sqlStatement = `INSERT INTO LAPTOP1 (ID, Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt) VALUES ${valuesClauses.join(',')}`;
//                     // sqlStatement = `INSERT INTO LAPTOP1 (ID, Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt) VALUES SELECT * from laptop1 AS t(ID, Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt)}`;

//                 console.log('sqlStatement',sqlStatement);
//                 // Establish the connection
//                 hanaconn.connect(hanaConfig, (err) => {
//                 if (err) {
//                     console.error('Connection error:', err);
//                     return;
//                 }
//                  // Execute the batch insert SQL statement
//                 hanaconn.exec(sqlStatement, (err, results2) => {
//                     if (err) {
//                         console.error('Batch insert error:', err);
//                     } else {
//                         console.log('Batch insert successful:', results2);
//                     }
//                     // Close the connection
//                     hanaconn.disconnect();



            //     result.forEach(async element => {
            //         let bool;
            //         let { ID,Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = element;
            //         if(IsActive==0){
            //             bool=false;
            //         }
            //         else{
            //             bool=true;
            //         }
            //     console.log('ID',ID);
            //     console.log('Name',Name);
            //     console.log('Descr',Descr);
            //     console.log('IsActive',IsActive);
            //     console.log('bool',bool);
            //     console.log('createdBy',createdBy);
            //     // createdAt='2024-01-23 12:08:38.123'
            //     createdAt=createdAt.toISOString().replace('.00Z','').replace('T',' ');;
            //     // createdAt=`2024-01-23 12:08:38.123`;
            // console.log('createdAt',createdAt);
            //     // console.log('createdAt',createdAt2);
            //     console.log('modifiedBy',modifiedBy);
            //     console.log('modifiedAt',modifiedAt);

                
            //     try{
                
            //     let insertQuery;
            //     if(modifiedAt==null){
            //         insertQuery = `INSERT INTO KARTHIKEYAN.LAPTOP1 (ID,NAME,DESCR,ISACTIVE,CREATEDBY,CREATEDAT,MODIFIEDBY) VALUES (${ID},'${Name}','${Descr}',${bool},'${createdBy}','${createdAt}','${modifiedBy}')`;
            
            //     }
            //     else{
            //     insertQuery = `INSERT INTO KARTHIKEYAN.LAPTOP1 (ID,NAME,DESCR,ISACTIVE,CREATEDBY,CREATEDAT,MODIFIEDBY,MODIFIEDAT) VALUES (${ID},'${Name}','${Descr}',${bool},'${createdBy}','${createdAt}','${modifiedBy}','${modifiedAt}')`;
            //     }
            //     // await db.execSQL(insertQuery);
            //     // let addBatch=db.addBatch(insertQuery);
            //     // console.log('addBatch',addBatch);
            //     }
            //     catch(err){
            //         console.log('error message:',err);
            //     }
            //     });
                // Execute the batch
                // const finalResults = await db.executeBatch();
                // console.log('finalResults',finalResults);

            // });
        // })
    });

    
        LOG.info('Data inserted into HANA');
    
    // res.status(201).json({ message: 'Data inserted into HANA' });

    // res.json(responseData); // Send a JSON response
}
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Post data' });
}
  });


// updating data to VMWare Hana Database
cron.schedule('42 * * * *', async() => {
    let output;
// app.post('/updateData',async (req, res) => {
    try {

    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            let dateobj=new Date();
                let date=dateobj.getDate();
	console.log('Date',date);
	let month=dateobj.getMonth();
	console.log('month',month);
	let year=dateobj.getFullYear();
	console.log('year',year);
	let hrs=dateobj.getHours()-2;
	console.log('hrs',hrs);
	let min=dateobj.getMinutes();
	console.log('min',min);
	let sec=dateobj.getSeconds();
	console.log('sec',sec);
	let dt2=new Date(year,month,date,hrs,min,sec).toISOString()
    console.log('dt2',dt2);
            
            mycon.query(`SELECT * from laptop1 where IsActive=1 and MODIFIEDAT>'${dt2}'`,async function (err,result,fields){
                console.log('result',result);
                // response.send(result);
                output=await result;
                console.log('output',output);
                result.forEach(async element => {
                    let bool;
                    let { ID,Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = element;
                    if(IsActive==0){
                        bool=false;
                    }
                    else{
                        bool=true;
                    }
                console.log('ID',ID);
                console.log('Name',Name);
                console.log('Descr',Descr);
                console.log('IsActive',IsActive);
                console.log('bool',bool);
                console.log('createdBy',createdBy);
                createdAt=createdAt.toISOString().replace('.00Z','').replace('T',' ')
                // createdAt=`2024-01-23 12:08:38.123`;
            console.log('createdAt',createdAt);
                console.log('modifiedBy',modifiedBy);
                modifiedAt=modifiedAt.toISOString().replace('.00Z','').replace('T',' ');
                console.log('modifiedAt',modifiedAt);

                
                try{
                const db = new dbClass(await dbClass.createConnection(hanaConfig));
                let insertQuery;
                
                insertQuery = `UPDATE KARTHIKEYAN.LAPTOP1 SET NAME='${Name}',DESCR='${Descr}',CREATEDBY='${createdBy}',CREATEDAT='${createdAt}',MODIFIEDBY='${modifiedBy}',MODIFIEDAT='${modifiedAt}' Where ID=${ID}`;
            
                await db.execSQL(insertQuery);
                }
                catch(err){
                    console.log('error message:',err);
                }
                });
            });
        }
    });

    
        LOG.info('Data Updated into HANA');
    
    // res.status(201).json({ message: 'Data inserted into HANA' });

    // res.json(responseData); // Send a JSON response
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Update data' });
}
  });

//Delete/disable the data from VMWare Hana Database
cron.schedule('23 * * * *', async() => {
    let output;
// app.delete('/deleteData',async (req, res) => {
    try {

        
    mycon.connect(function (err){

        if(err){
            console.error('err',err);
        }
        else{
            let dateobj=new Date();
                let date=dateobj.getDate();
	console.log('Date',date);
	let month=dateobj.getMonth();
	console.log('month',month);
	let year=dateobj.getFullYear();
	console.log('year',year);
	let hrs=dateobj.getHours()-2;
	console.log('hrs',hrs);
	let min=dateobj.getMinutes();
	console.log('min',min);
	let sec=dateobj.getSeconds();
	console.log('sec',sec);
	let dt2=new Date(year,month,date,hrs,min,sec).toISOString()
    console.log('dt2',dt2);
            
            mycon.query(`SELECT * from laptop1 where IsActive=0 and CREATEDAT>'${dt2}'`,async function (err,result,fields){
                console.log('result',result);
                // response.send(result);
                output=await result;
                console.log('output',output);
                result.forEach(async element => {
                    let bool;
                    let { ID,Name,Descr,IsActive,createdBy,createdAt,modifiedBy,modifiedAt } = element;
                    if(IsActive==0){
                        bool=false;
                    }
                    else{
                        bool=true;
                    }
                console.log('ID',ID);
            //     console.log('Name',Name);
            //     console.log('Descr',Descr);
            //     console.log('IsActive',IsActive);
            //     console.log('bool',bool);
            //     console.log('createdBy',createdBy);
            //     // createdAt='2024-01-23 12:08:38.123'
            //     createdAt=createdAt.toISOString().replace('.00Z','').replace('T',' ');
            //     // createdAt=`2024-01-23 12:08:38.123`;
            //     modifiedAt=modifiedAt.toISOString().replace('.00Z','').replace('T',' ')
            // console.log('createdAt',createdAt);
            //     // console.log('createdAt',createdAt2);
            //     console.log('modifiedBy',modifiedBy);
            //     console.log('modifiedAt',modifiedAt);

                
                try{
                const db = new dbClass(await dbClass.createConnection(hanaConfig));
                let insertQuery;
                
                    insertQuery = `UPDATE KARTHIKEYAN.LAPTOP1 set ISACTIVE=false where ID=${ID}`;
            
               
                await db.execSQL(insertQuery);
                }
                catch(err){
                    console.log('error message:',err);
                }
                });
            });
        }
    });

    
        LOG.info('Data Deleted into HANA');
    
    // res.status(201).json({ message: 'Data inserted into HANA' });

    // res.json(responseData); // Send a JSON response
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete data' });
}
  });