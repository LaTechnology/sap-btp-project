const cds=require('@sap/cds')
const express = require('express');

const app = express ();
app.use(express.json());

const port = process.env.PORT || 3000;

module.exports=cds.service.impl(async function(){
  const service =await cds.connect.to('NorthWind');
  // const { Products,Advertisements,PersonDetails,Persons,Suppliers,Categories,ProductDetails,Employee,Customer,FeaturedProduct } = this.entities;
	
  console.log('service',service);
  // console.log('Products',Products);
app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
    app.get('/Products', async (request,response) => {
        const status = {
           "Status": "Walking By"
        };
        console.log('request.headers',request.headers);
        console.log('request.params',request.params);
        console.log('request.path',request.path);
        // let prod=await SELECT.from(Products);

        response.send(status);
    });
  });
});
  