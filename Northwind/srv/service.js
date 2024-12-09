const cds = require('@sap/cds');
const db = cds.connect.to('db')
const express = require('express');
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
   let output;
 
    async function start(){
	console.log("hello");
	const service1 = await cds.connect.to('Northwind');
	// let {ProductsLocal}=cds.entities;
	let { Products } = service1.entities;
	// console.log("Products :"+Products);
	let products= SELECT.from (Products);

	// let insert=INSERT.into ('CatalogService_ProductsLocal').as(SELECT.from (Products));
	// await db.run(insert);
	let Local=SELECT.from ('CatalogService_ProductsLocal');
	let out=await cds.db.run(Local);
	// console.log(out);
	let dt=(new Date())-new Date('2024-00-00 00:00:00.000')
    console.log('dt',dt);

	let dateobj=new Date();
	let date=dateobj.getDate();
	console.log('date',date);
	let month=dateobj.getMonth();
	console.log('month',month);
	let year=dateobj.getFullYear()-24;
	console.log('year',year);
	let hrs=dateobj.getHours()-2;
	console.log('hrs',hrs);
	let min=dateobj.getMinutes();
	console.log('min',min);
	let sec=dateobj.getSeconds();
	console.log('se',sec);
	let dt2=new Date(year,month,date,hrs,min,sec).toISOString()
    console.log('dt2',dt2);
	let cc='2024-01-23T12:18:40.000Z';
	const selectQuery=await service1.run(SELECT.from (Products).where(`ReleaseDate >= '${dt2}'`));
            console.log('selectQuery',selectQuery);
	// console.log('new Date()',new Date().getHours());
	// console.log('new Date()',new Date().getHours());
	// let insert=INSERT.into('CatalogService_ProductsLocal',{ID:'125'});
	// await cds.db.run(insert);
	// let Local=SELECT.from ('CatalogService_ProductsLocal');
	// let out=await cds.db.run(Local);
	// console.log("Local : "+out);

	output=await service1.get(products);
	// console.log(output);
	return output;
  }
  start();

module.exports = cds.service.impl(async function() {
	let { Products } = this.entities;
	const service1 = await cds.connect.to('Northwind');
	console.log("SERVICE",service1);
	this.on('READ', Products, request => {
		output= service1.tx(request).run(request.query);
		
		return output;
	});
    const { Persons } = this.entities;
	const service2 = await cds.connect.to('Northwind');
	this.on('READ', Persons, request => {
		return service2.tx(request).run(request.query);
	});
	
});
app.get("/getproducts", (request, response)=>{
	
    // const status = output;
	response.send(output);
  });
  var cron = require('node-cron');
//1*
// cron.schedule('* * * * *', () => {
   //  console.log('running a task every minute');
     //    });
	 
//2*
// cron.schedule('1,20,4,5 * * * *', () => {
	
//        console.log('running every minute 1, 20, 4 and 5');
// });

cron.schedule('25-30 * * * *', () => {
	console.log('running every minute to 41 from 45');
  });