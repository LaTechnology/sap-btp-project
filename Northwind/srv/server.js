// var axios = require('axios');
// var express = require('express');
// var hana = require('@sap/hana-client');
// var app = express();

// const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);
// const conSrvCred = VCAP_SERVICES.connectivity[0].credentials;

// app.get('/', function (req, res) {
//     res.send('Hello World');
// })

// app.get('/Customers', async function (req, res) {
//     const connJwtToken = await _fetchJwtToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret);

//     var connOptions = {
//         serverNode: 'hxehost_VH:2000', // Virtual host specified in the Cloud Connector
//         proxyUsername: connJwtToken,
//         proxyPort: conSrvCred.onpremise_socks5_proxy_port,
//         proxyHostname: conSrvCred.onpremise_proxy_host,
//         //proxyScpAccount: 'myLocID',  // Cloud Connector's location ID if specified in the Cloud Connector
//                                        // A location ID is used when multiple Cloud Connectors are connected to the same subaccount
//         UID: 'KARTHIKEYAN',
//         PWD: 'Ladera123'
//         //traceFile: 'stdout',
//         //traceOptions: 'sql=warning'
//     };
//     var connection = hana.createConnection();
//     connection.connect(connOptions, function(err) {
//         if (err) {
//             return console.error(err);
//         }
//         var sql = 'select * from KARTHIKEYAN.LADERATECHNOLOGY;';
//         var rows = connection.exec(sql, function(err, rows) {
//             if (err) {
//                 return console.error(err);
//             }
//             console.log(rows);
//             res.send(rows);
//             connection.disconnect(function(err) {
//                 if (err) {
//                     return console.error(err);
//                 }   
//             });
//         });
//     });
// })

// const port = process.env.PORT || 3000;
// var server = app.listen(port, function () {
//      var host = server.address().address
//      var port = server.address().port
//      console.log("Example app listening at http://%s:%s", host, port)
// })

// const _fetchJwtToken = async function(oauthUrl, oauthClient, oauthSecret) {
//     return new Promise ((resolve, reject) => {
//         const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'  
//         const config = {
//             headers: {
//                Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
//             }
//         }
//         axios.get(tokenUrl, config)
//         .then(response => {
//            resolve(response.data.access_token)
//         })
//         .catch(error => {
//            reject(error)
//         })
//     })   
// }

const cds = require('@sap/cds');

// Reference HANA driver in the Node app and update the connection details
let dbClass = require('sap-hdbext-promisfied')
let hana = require('@sap/hana-client');

// Modify the host IP and password based on your system information
let hanaConfig = {
    host: '192.168.0.219',
    port: `39013`,
    sslValidateCertificate: false,
    encrypt: true,
    user: `KARTHIKEYAN`,
    password: 'Ladera123'
}

const LOG=cds.log("HANA ON PREMISE ");

// Execute the query and output the results
async function intro(req,res) {
    try {
        let db = new dbClass(await dbClass.createConnection(hanaConfig))
        let rows = await db.execSQL("select * from KARTHIKEYAN.LADERATECHNOLOGY");
        LOG.info("Data fetched from HANA ", rows);
        return rows;
    } catch (error) {
        return console.error(error)
    }
}
 

const express = require('express');
const app = express();
app.use(express.json());
const cron = require('node-cron');

// app.post('/postData',);
function post(path, ...handlers) {
    app.post(path, ...handlers);
  }
  

app.post('/postData',async (req, res) => {
    try {
    // Handle the POST request
    console.log('req',req);
    console.log('res',res);
    const requestBody=await req.body; // Access the request body
    console.log('req.body',req.body);
    console.log('requestBody',requestBody);
    const responseData = { message: 'POST request received', data: requestBody };

    const { ID, EMPLOYEENAME, DESIGNATION,EMPLOYEEID,SALARY } = req.body;
    console.log('ID',ID);
    console.log('EMPLOYEENAME',EMPLOYEENAME);
    console.log('DESIGNATION',DESIGNATION);
    console.log('EMPLOYEEID',EMPLOYEEID);
    console.log('SALARY',SALARY);

    // const Emp=EMPLOYEENAME;
    // console.log('Emp',Emp);

    const db = new dbClass(await dbClass.createConnection(hanaConfig));
    // const insertQuery = `INSERT INTO KARTHIKEYAN.LADERATECHNOLOGY (ID, EMPLOYEENAME, DESIGNATION, EMPLOYEEID, SALARY) VALUES (7,'Pream ','Java Developer','LT500',25000)`;
    const insertQuery = `INSERT INTO KARTHIKEYAN.LADERATECHNOLOGY VALUES (${ID},'${EMPLOYEENAME}','${DESIGNATION}','${EMPLOYEEID}',${SALARY})`;
    // const parameters = [ID,EMPLOYEENAME,DESIGNATION,EMPLOYEEID,SALARY ];

    // console.log('parameters',parameters);
    // await db.execSQL(insertQuery, parameters);
    await db.execSQL(insertQuery);
    LOG.info('Data inserted into HANA');
    
    // res.status(201).json({ message: 'Data inserted into HANA' });

    res.json(responseData); // Send a JSON response
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Post data' });
}
  });


  function logMessage() {
    console.log('Cron job executed at:', new Date().toLocaleString());
    }

    // Schedule the cron job to run every minute
 cron.schedule('1 * * * *', async() => {
    logMessage();
    // app.post(async (req, res) => {
        try {
        // Handle the POST request
        // console.log('req',req);
        // console.log('res',res);
        // const requestBody=await req.body; // Access the request body
        // console.log('req.body',req.body);
        // console.log('requestBody',requestBody);
        // const responseData = { message: 'POST request received', data: requestBody };
    
        // const { ID, EMPLOYEENAME, DESIGNATION,EMPLOYEEID,SALARY } = req.body;
        // console.log('ID',ID);
        // console.log('EMPLOYEENAME',EMPLOYEENAME);
        // console.log('DESIGNATION',DESIGNATION);
        // console.log('EMPLOYEEID',EMPLOYEEID);
        // console.log('SALARY',SALARY);
    
        const db = new dbClass(await dbClass.createConnection(hanaConfig));
        const insertQuery = `INSERT INTO KARTHIKEYAN.LADERATECHNOLOGY (ID, EMPLOYEENAME, DESIGNATION, EMPLOYEEID, SALARY) VALUES (19,'Devishri ','Java Developer','LT502',25000)`;
        // const insertQuery = `INSERT INTO KARTHIKEYAN.LADERATECHNOLOGY (ID,EMPLOYEENAME,DESIGNATION,EMPLOYEEID,SALARY) VALUES (?,?,?,?,?)`;
        // const parameters = [ID,EMPLOYEENAME,DESIGNATION,EMPLOYEEID,SALARY ];
    
        // const insertQuery=`INSERT INTO KARTHIKEYAN.PRODUCTS (ID,Name,Description,ReleaseDate,DiscontinuedDate,Rating,Price) VALUES (1,'De)`

        // console.log('parameters',parameters);
        // await db.execSQL(insertQuery, parameters);
        await db.execSQL(insertQuery);
        LOG.info('Data inserted into HANA');
        
        // res.status(201).json({ message: 'Data inserted into HANA' });
    
        // res.json(responseData); // Send a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to Post data' });
    }
      });
    // });

  cron.schedule('1 * * * *', async () => {
    console.log('Running cron job to insert data into HANA...');
    // You may want to invoke the logic from the route handler here
    // For simplicity, let's call the insertData route handler directly
    // const fakeReq = { body: { /* Provide data for the request body */ } };
    // const fakeRes = { json: (data) => console.log(data) }; // A mock response object
    // await app.get('/insertData', fakeReq, fakeRes);
    await app.get('/fetchData2', async (req, res) => {
        try {
            console.log('req',req);
            const Employee = await intro(req, res); // Call the intro function to fetch data
            console.log('Employee',Employee);
            res.json(Employee); // Send the fetched data as JSON response
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });
  });

  cron.schedule('0 */2 * * *', async () => {
    console.log('Running cron job to get and insert data into HANA...');
    // console.log('connected');
    let ID,Name,Description,ReleaseDate,DiscontinuedDate,Price,Rating;
    // console.log('connected');
    let db = new dbClass(await dbClass.createConnection(hanaConfig))
    console.log('db',db);
    // console.log('connected');
    // console.log('connected');
    // await app.get('/fetchData2', async (req, res) => {
        // try {

    // console.log('connected');
            const service1 = await cds.connect.to('Northwind');
            const db2 = await cds.connect.to('db');
            console.log('service1',service1);
            const { Products,Advertisements,PersonDetails,Persons,Suppliers,Categories,ProductDetails,Employee,Customer,FeaturedProduct } = service1.entities;
            console.log('Products',Products);
            // let dt=(new Date().toLocaleString())-'0024-00-00 00:00:00.000'
            // console.log('dt',dt);
            let dateobj=new Date();
	let date=dateobj.getDate();
	console.log('Date',date);
	let month=dateobj.getMonth();
	console.log('month',month);
	let year=dateobj.getFullYear()-24;
	console.log('year',year);
	let hrs=dateobj.getHours()-2;
	console.log('hrs',hrs);
	let min=dateobj.getMinutes();
	console.log('min',min);
	let sec=dateobj.getSeconds();
	console.log('sec',sec);
	let dt2=new Date(year,month,date,hrs,min,sec).toISOString()
    console.log('dt2',dt2);
	// let cc='2024-01-23T12:18:40.000Z';
	const selectQuery=await service1.run(SELECT.from (Products).where(`ReleaseDate > '${dt2}'`));
            // const selectQuery=await service1.run(SELECT.from(Products).where('ReleaseDate>=',dt2));
            console.log('selectQuery',selectQuery);
            let insertQuery;
            selectQuery.forEach(async element => {
                console.log('element.ID',element.ID);
                ID=element.ID;
                Name=element.Name;
                console.log('Name',Name);
                Description=element.Description;
                console.log('Descr',Description);
                ReleaseDate=element.ReleaseDate;
                console.log('ReleaseDate',ReleaseDate);
                DiscontinuedDate='2000-10-01T00:00:00Z';
                console.log('DiscontinuedDATE',DiscontinuedDate);
                Price=element.Price;
                console.log('Price',Price);
                Rating=element.Rating;
                console.log('Rating',Rating);
                try{
                    insertQuery=`INSERT INTO KARTHIKEYAN.PRODUCTS (ID,Name,Description,ReleaseDate,DiscontinuedDate,Price,Rating) VALUES (${ID},'${Name}','${Description}','${ReleaseDate}','${DiscontinuedDate}',${Price},${Rating})`;
                    console.log('insertQuery',insertQuery);
                    await db.execSQL(insertQuery);
                } catch (error) {
                    console.log(error);
                    
                }
            });
            
            

            
            let rows = await db.execSQL("select * from KARTHIKEYAN.PRODUCTS");
            
            // LOG.info("Data fetched from HANA2 ", rows);
            
            // const insertQuery = `INSERT INTO KARTHIKEYAN.PRODUCTS VALUES (19,'Devishri ','Java Developer','LT502',25000)`;
            // const insertQuery = `
            // INSERT INTO KARTHIKEYAN.NEWTABLE (ID,Name,Description,RELEASEDATE,DiscontinuedDate,Rating,Price)
            // SELECT ID,Name,Description,RELEASEDATE,DiscontinuedDate,Rating,Price
            // FROM KARTHIKEYAN.PRODUCTS 
            // WHERE RELEASEDATE>='2024-01-23 12:08:38.123'
        //   `;
        //   await db.execSQL(insertQuery);
    console.log('Data copied successfully.');
            
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: 'Failed to fetch data' });
        // }
    // });
  });

app.get('/fetchData', async (req, res) => {
    try {
        console.log('req',req);
        const Employee = await intro(req, res); // Call the intro function to fetch data
        console.log('Employee',Employee);
        res.json(Employee); // Send the fetched data as JSON response
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
let dt=(new Date().toLocaleString())-'0024-00-00 00:00:00.000'
            console.log('dt',dt);