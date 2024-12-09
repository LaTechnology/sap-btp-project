const cds=require('@sap/cds')
// const express = require('express');
// const app = express();
// const port = 4002; // Change this to your desired port number

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// module.exports = class CatalogService extends cds.ApplicationService { 
//     init() {
// const messaging= cds.connect.to('messaging')
//     const { Books } = cds.entities('sap.capire')
//     const { ListOfBooks } = this.entities
  
//     const srv = (new cds.Service)
//  .on('READ',ListOfBooks, req => console.log (req.event, req.entity))
//  .on('Books', req => console.log (req.event, req.data))
//  .on('*', msg => console.log (msg.event))

//  this.on('READ',ListOfBooks,async req=>{
//   console.log('on method for ListofBooks');
  
//   return cds.run(req.query);
//  })
//  cds.on('served',()=>{
//   const { CatalogService } = cds.services
//   // console.log(cds.services);
//   console.log(CatalogService);
//   CatalogService.on('READ','ListofBooks', (req,next) => {console.log('on method of ListofBooks is called'); })
//   CatalogService.prepend (()=>{
//     CatalogService.on('READ','ListofBooks', (req,next) => {console.log('prepend method is called'); })
//   })
// })
 

//     // Add some discount for overstocked books
//     this.after('READ', ListOfBooks, each => {
//         console.log('each',each);
//       if (each.stock > 100) each.title += ` -- 11% discount!`
//     })
  
//     // Reduce stock of ordered books if available stock suffices
//     this.on('submitOrder', async req => {
//       // console.log('req',req);
//       let { book:id, quantity } = req.data
//       console.log('req.data',req.data);
//       console.log('id',id);
//       console.log('quantity',quantity);
//       let book = await SELECT.from (Books, id, b => b.stock)
//       console.log('book',book);
  
//       // Validate input data
//       if (!book) return req.error (404, `Book #${id} doesn't exist`)
//       if (quantity < 1) return req.error (400, `quantity has to be 1 or more`)
//       if (quantity > book.stock) return req.error (409, `${quantity} exceeds stock for book #${id}`)
//       // await srv.send('POST','/Books', { title: 'Catweazle' })

//       // Reduce stock in database and return updated stock value
//       await UPDATE (Books, id) .with ({ stock: book.stock -= quantity })
//       return book
//     })
  
//     // Emit event when an order has been submitted
//     this.after('submitOrder', async (_,req) => {
//       let { book, quantity } = req.data
//       console.log('req.data',req.data);
//       console.log('book',book);
//       console.log('quantity',quantity);
//       console.log('req.user',req.user);
//       await this.emit('OrderedBook', { book, quantity, buyer: req.user.id })
//     })

    
   
//     this.on('OrderedBook',async req=>{
//       console.log('req',req);
//       console.log('OrderedBook');
//     })

//     this.on('submitMe', async req => {
//       // console.log('req',req);
//       let { book:id, quantity,price,user } = req.data
//       console.log('req.data',req.data);
//       console.log('id',id);
//       console.log('quantity',quantity);
//       console.log('Price',price);
//       console.log("User",user);
//       let book = await SELECT.from (Books, id, b => b.stock)
//       console.log('book',book);
  
//       // Validate input data
//       if (!book) return req.error (404, `Book #${id} doesn't exist`)
//       if (quantity < 1) return req.error (400, `quantity has to be 1 or more`)
//       if (quantity > book.stock) return req.error (409, `${quantity} exceeds stock for book #${id}`)
//       // await srv.send('POST','/Books', { title: 'Catweazle' })

//       // Reduce stock in database and return updated stock value
//       await UPDATE (Books, id) .with ({ stock: book.stock -= quantity })
//       return book
//     })
  
// //     const AdminService =  cds.connect.to('AdminService')
// // const CatalogService =  cds.connect.to('CatalogService')
// // CatalogService.on ('OrderedBook', async msg => { 
// //   console.log('OrderedBooks inside');
// //   const { buyer, books } = msg.data
// //   await CatalogService.create ('ListofBooks', {
// //     customer: buyer,
// //     items: books
// //   })
// // })
//     // Delegate requests to the underlying generic service
//     return super.init()
//   }}

module.exports=cds.service.impl(async function(){
  const messaging= await cds.connect.to('messaging')
  const { Books } = cds.entities('sap.capire')
    const { ListOfBooks } = this.entities

    // Reduce stock of ordered books if available stock suffices
    this.on('submitOrder', async req => {
      // console.log('req',req);
      let { book:id, quantity } = req.data
      console.log('req.data',req.data);
      console.log('id',id);
      console.log('quantity',quantity);
      let book = await SELECT.from (Books, id, b => b.stock)
      console.log('book',book);
  
      // Validate input data
      if (!book) return req.error (404, `Book #${id} doesn't exist`)
      if (quantity < 1) return req.error (400, `quantity has to be 1 or more`)
      if (quantity > book.stock) return req.error (409, `${quantity} exceeds stock for book #${id}`)
      // await srv.send('POST','/Books', { title: 'Catweazle' })

      // Reduce stock in database and return updated stock value
      await UPDATE (Books, id) .with ({ stock: book.stock -= quantity })
      return book
    })
  
    // Emit event when an order has been submitted
    this.after('submitOrder', async (_,req) => {
      let { book, quantity } = req.data
      console.log('req.data',req.data);
      console.log('book',book);
      console.log('quantity',quantity);
      console.log('req.user',req.user);
      await this.emit('OrderedBook', { book, quantity, buyer: req.user.id })
    })

    messaging.on('OrderedBook',msg=>{
      console.log('msg',msg);
    })
   
    this.on('OrderedBook',async req=>{
      console.log('req',req);
      console.log('OrderedBook');
    })

    this.on('submitMe', async req => {
      // console.log('req',req);
      let { book:id, quantity,price,user } = req.data
      console.log('req.data',req.data);
      console.log('id',id);
      console.log('quantity',quantity);
      console.log('Price',price);
      console.log("User",user);
      let book = await SELECT.from (Books, id, b => b.stock)
      console.log('book',book);
  
      // Validate input data
      if (!book) return req.error (404, `Book #${id} doesn't exist`)
      if (quantity < 1) return req.error (400, `quantity has to be 1 or more`)
      if (quantity > book.stock) return req.error (409, `${quantity} exceeds stock for book #${id}`)
      // await srv.send('POST','/Books', { title: 'Catweazle' })

      // Reduce stock in database and return updated stock value
      await UPDATE (Books, id) .with ({ stock: book.stock -= quantity })
      return book
    })

//   this.on('READ',req=>{
//     console.log('function is called');
//     cds.exit();
//   })
//   const { CatalogService } = cds.services
//   // console.log(cds.services);
//   console.log(CatalogService);
//   CatalogService.on('READ','ListofBooks', async function(req,next){console.log('on method of ListofBooks is called'); })
//   CatalogService.prepend (async function(){
//     CatalogService.on('READ','ListofBooks', (req,next) => {console.log('prepend method is called'); })
//   })
//   cds.on('shutdown',()=>{
//     const { CatalogService } = cds.services
//     // console.log(cds.services);
//     console.log(CatalogService);
//     CatalogService.on('READ','ListofBooks', async function(req,next){console.log('on method of ListofBooks is called'); })
//     CatalogService.prepend (async function(){
//       CatalogService.on('READ','ListofBooks', (req,next) => {console.log('prepend method is called'); })
//     })
//   })
})