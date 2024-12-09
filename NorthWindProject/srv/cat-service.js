// const cds = require('@sap/cds');
// const express = require('express');

// const app = express ();
// app.use(express.json());
// let db;
// const PORT = process.env.PORT || 3000;

  module.exports = cds.service.impl(async function() {
	const { Products,Advertisements,PersonDetails,Persons,Suppliers,Categories,ProductDetails,Employee,Customer,FeaturedProduct } = this.entities;
	const service = await cds.connect.to('NorthWind');
  
	this.on('READ', [Products,Advertisements,PersonDetails,Persons,Suppliers,Categories,ProductDetails,Employee,Customer,FeaturedProduct], request => {
        console.log('request.query ',request.query);
		return service.tx(request).run(request.query);
	});


    console.log('inside AdminService js file');
  
  const {WithoutPrime,Products2}=this.entities;

  this.on('*',Products2,req=>{
    console.log('Products2');
    return cds.tx(req).run(req.query);
  })
  this.on('*',WithoutPrime,req=>{
    console.log('WithoutPrime');
    return cds.tx(req).run(req.query);
  })
  });
  
//   app.listen(PORT, () => {
//     console.log("Server Listening on PORT:", PORT);
//   });
  
//     let query1,result1;
//     async function OpenMe() {
//     const service1 = await cds.connect.to('NorthWind');
//     db = await cds.connect.to('db');
//     const { Products,Advertisements,PersonDetails,Persons,Suppliers,Categories,ProductDetails,Employee,Customer,FeaturedProduct } = service1.entities;
//     // console.log('Products',Products);
//     // const {Products2}=this.entities;
//     query1=SELECT.from(Products);
//     // let dbinsertquery=db.INSERT.into('sap.capire.Products2').as(SELECT.from(Products));
//     // console.log('dbinsertquery',dbinsertquery);
//     let insertquery= INSERT.into('sap.capire.Products2').as(SELECT.from(Products))
//     console.log('insertquery',insertquery);
//     result1=await service1.get(query1);

//     };
    
//     app.get("/getProducts",async (request,response) => {
//       await OpenMe();
//         // const status = {
//         //    "Status": "Walking By"
//         // };
//         // console.log('request.headers',request.headers);
//         // console.log('request.params',request.params);
//         // console.log('request.path',request.path);
//         // let prod=await SELECT.from(Products);
//         // console.log('query1',query1);
//         console.log("result1",result1);
//         response.send(result1)
//     });
//   // });


