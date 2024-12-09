
cds=require('@sap/cds')

module.exports=cds.service.impl(async function(){
    console.log('inside the services3.js file');
    // const ServeMe =await cds.connect.to('ServeMe')
    // const db = await cds.connect.to('db')
    // console.log('ServeMe',ServeMe);
    // console.log('db',db);
})
