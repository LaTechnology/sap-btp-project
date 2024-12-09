const cds = require('@sap/cds');
const express = require('express');
const app = express();
app.use(express.json());

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


const LOG=cds.log("HANA ON PREMISE ");

const port = process.env.PORT || 8080;

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
        let rows = await db.execSQL("select * from KARTHIKEYAN.PROPOSALOWNER");
        LOG.info("Data fetched from HANA ", rows);
        return rows;
    } catch (error) {
        return console.error(error)
    }
}


app.post('/upload',async (req, res) => {
    let output;
    try {

        console.log('req.body',req.body);

        
        
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
    output=await req.body;
                console.log('output',output);
                const db = new dbClass(await dbClass.createConnection(hanaConfig));
                output.forEach(async element => {
                
                    let { ID,createdBy,createdAt,modifiedBy,modifiedAt,name,logo } = element;
                    
                console.log('ID',ID);
                console.log('name',name);
               console.log('logo',logo);
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
                    insertQuery = `INSERT INTO KARTHIKEYAN.PROPOSALOWNER (ID,NAME,LOGO,CREATEDBY,CREATEDAT,MODIFIEDBY) VALUES (${ID},'${Name}','${logo}','${createdBy}','${createdAt}','${modifiedBy}')`;
            
                }
                else{
                insertQuery = `INSERT INTO KARTHIKEYAN.PROPOSALOWNER (ID,NAME,LOGO,CREATEDBY,CREATEDAT,MODIFIEDBY,MODIFIEDAT) VALUES (${ID},'${name}','${logo}','${createdBy}','${createdAt}','${modifiedBy}','${modifiedAt}')`;
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

            


    
        LOG.info('Data inserted into HANA');
    
    // res.status(201).json({ message: 'Data inserted into HANA' });

    // res.json(responseData); // Send a JSON response
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Post data' });
}
  });