// const { log } = require('@sap/cds');

// const cds=require('@sap/cds');
// module.exports=async function (){
// cds.app = require('express')()
// const { Books, Author } = this.entities

// cds.model = await cds.load('*')
// cds.services = await cds.serve('CatalogService').from(cds.model).in(cds.app);
// };

const cds=require('@sap/cds');
cds.app = require('express')()
// const a=cds.app.req;
// console.log('cds.app.req',cds.app.req);
// console.log(a);
// console.log(cds.app);
// console.log(cds.req);
// cds.Request
// cds.Service
// cds.server()
// cds.Request
module.exports=cds.service.impl(async function (){
    const {Author,Books}= this.entities
    let c=await cds.compile(['db','srv','app'])
    console.log(c);
    console.log('Books');
    this.before('*',Books,req=>{
        console.log('before function is used');
        console.log(req.method);
        let { res } = req.http
        // res.send('given') // This will work for before function but we cant send in on function once response is send
        // req. reject()
        // return cds.tx(req).run(SELECT.from(Books).where({ID:{'=':2222}})); // This will result in empty result because in before function we can only check the transaction or credentials
    })
    this.after('*',Books,(req)=>{
        console.log('after function is used');
       
      
        // let { res } = req.http//Cannot destructure property 'res' of 'req.http' as it is undefined.
        // res.send('given')// This will not work for after function
        // res.send('Hi this is After method')// This will not work for after function
        // return cds.tx(req).run(SELECT.from(Books)); // This will not load because here only transaction is closed
    })
    this.on('*',Books,req=>{
        req.on('done', async () => {
            console.log('done');
            await cds.tx(async () => {
            //   await SELECT  .from `Books` .where `ID = 1111`
              console.log('done inside');
            })
          })
        req.on('succeeded', async () => {
            console.log('succeeded');
            await cds.tx(async () => {
            //   await SELECT  .from `Books` .where `ID = 1111`
              console.log('succeeded inside');
            })
          })
       
        //   req.after('commit', async () => { // req.after function is not present
        //     console.log('commit');
        //     await cds.tx(async () => {
        //     //   await SELECT  .from `Books` .where `ID = 1111`
        //       console.log('commit inside');
        //     })
        //   })
          req.before('commit', async () => {
            console.log('commit before');
            await cds.tx(async () => {
            //   await SELECT  .from `Books` .where `ID = 1111`
              console.log('commit before inside');
            })
          })
        req.on('commit', async () => {
            console.log('commit');
            await cds.tx(async () => {
            //   await SELECT  .from `Books` .where `ID = 1111`
              console.log('commit inside');
            })
          })
        req.on('failed', async () => {
            console.log('failed');
            await cds.tx(async () => {
            //   await SELECT  .from `Books` .where `ID = 1111`
              console.log('failed inside');
            })
          })
       
           console.log(req.event);//returns the event name in string 
           console.log(req.headers);//returns the header object as nodejs standard http header 
           console.log(req.data);//prints the entities record in the value object
           console.log(req.method);//returns the http equivalent method in string eg:[GET]
           console.log(req.target);//returns the target entity
           console.log(req.path ); //returns the path eg:[Catalogservice.Books]   
           console.log(req.params);//returns the params eq:[]   
           // console.log(req);
            const [ Books2,Author ] = req.params  //returns the params eq:[1111,1] 
            // console.log(cds.context);
            console.log(Books2);//returns the params eq:1111
            console.log(Author);//returns the params eq:1
            // req.query={}
            // req.query = {SELECT:{from:{ref:['Books']}}}
            console.log(req.query); //It gives the query in the format of cql eq:Query {SELECT: { from: { ref: [Array] } },[Symbol(draftParams)]: {},[Symbol(original)]: Query {SELECT: { from: [Object], limit: [Object], orderBy: [Array] }}}
            const {Books3}=req.query
            console.log(Books3); //undefined
            // console.log(SELECT.one.from(req.subject));//> returns single object but not working
            // console.log(req.reply()); //Stores the given results in req.results, which will then be sent back to the client, rendered in a protocol-specific way.
            // req.reject(); //Rejects the request with the given HTTP response code and single message. Additionally, req.reject throws an error based on the passed arguments eg given below
            console.log(req.info('Hi bro')); // gives the info message eg:{ message: 'Hi bro', numericSeverity: 2 }
            // console.log(req.info);
            // console.log(req.error);
            // req.error({
            //     code:"some code",
            //     message:'Some message',
            //     target:'some field',
            //     status:420
            // }); //gives the Error with some message eg:<error xmlns="http://docs.oasis-open.org/odata/ns/metadata"><code>some code</code><message>Some message</message><target>some field</target><annotation term="Common.numericSeverity" type="Edm.Decimal">4</annotation></error>
            // console.log(req. reject()); //gives the error as undefined eg:<error xmlns="http://docs.oasis-open.org/odata/ns/metadata"><code>500</code><message>undefined</message><annotation term="Common.numericSeverity" type="Edm.Decimal">4</annotation></error>
           console.log(req.http);
            let { res } = req.http
            // req.before('commit',Books,(req)=>{
            //     console.log("commit: immediately before calling commit");
            // }) 
            // req.on('succeeded',Books,(req1)=>{
            //     console.log("succeeded: request succeeded, after commit");
            // })
            // res.send('Hello!')
            // return cds.tx(req).run(req.query);
            
            return cds.tx(req).run(SELECT.from(Books).where({ID:{'=':1111}})); // This will produce the result as described to show  Books with ID=1111
        })


    this.before('commit',Author,(req)=>{
        console.log("commit: immediately before calling commit");
    }) 
    this.on('succeeded',Author,(req)=>{
        console.log("succeeded: request succeeded, after commit");
    })  
    this.on('failed',Author,req=>{
        console.log('failed: request failed, after rollback');
    })
    this.on('done',Author,req=>{
        console.log('done: request succeeded/failed, after all');
        return cds.tx(req).run(SELECT.from(Books).where({ID:{'=':1111}}));
    })
        
    // const {Books,Author}= this.entities
    // this.on('*',[Author,Books],req=>{
    //     console.log(req);
    //     const [ Books,Author ] = req.params
    //     console.log(Books);
    //     console.log(Author);
    //     return srv.tx(req).run(req.query);
    // })
    
})


// cds.on('served',()=>{
//     const { ServeMe } = cds.services
//     ServeMe.prepend (()=>{
//       ServeMe.on('READ','p_Author', (req,next) => {console.log(req,next);})
//     })
// })