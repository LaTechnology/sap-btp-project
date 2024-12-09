const cds =require('@sap/cds');
// cds.model = await cds.load('*')
// class MineService extends cds.ApplicationService{
//     init(){
//         console.log('ApplicationService is extended by me');
//         const srv=  cds.connect.to('CatalogService');
//         this.on('error',(err,req)=>{
//             console.log('I am an Error');
//             err.message='oh my God '+err.message;
//         })
//         this.on('*',req=>{
//             console.log('req is called',req.data);
//             console.log('srv',srv);
//             console.log('srv.submitOrder',srv.MineService);
//             return cds.tx(req).run(req.query)
//             // req.reply('forbidden')
//             // req.reject();
//             // req.error({
//             //     code:'my code',
//             //     message: 'error message',
//             //     status:404,
//             //     target:'my field'
//             // })
//         })
        
//             // console.log(' is connected');
//             // this.on ('submitOrder', async req => {
//             //     // ... handle the request, and inform whoever might be interested:
//             //     await this.emit('BooksOrdered', req.data) 
//             //   })
//             // const srv=  cds.connect.to('CatalogService');
//             // srv.on('BooksOrdered',async msg=>{
                
//             //     console.log('CatalogService is connected');
//             //     // return srv.run(req.query)
//             // })
        
       
//         return super.init();
//     }

//     static handle_authorization(){
        
//     }

// }
// module.exports=MineService;

module.exports = cds.service.impl(async function() {

    // const bupa =  cds.connect.to('CatalogService');

    this.on('READ', 'Books', async req => {
        console.log('Books on function');
         return cds.run(req.query);
    });

    this.after('READ', 'Books', risksData => {
        console.log('Books after function');
    });
});