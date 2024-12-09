const cds = require('@sap/cds')

module.exports = class AdminService extends cds.ApplicationService { 
  init(){
    console.log('inside AdminService js file');
  this.before ('NEW','Authors', genid)
  this.before ('NEW','Books', genid)



  const {Books,Authors,WithoutPrime}=this.entities;
  console.log('Books',Books);

  this.on('*',WithoutPrime,req=>{
    console.log('WithoutPrime');
    return cds.tx(req).run(req.query);
  })
  this.on ('*', function authorize (req,next) {
    if (req.user.is('authenticated-user')){ 
      console.log('is authenticated-user');
      return req.reject('FORBIDDEN')
  }
    else return next() 
  })
  // this.on ('READ',[Books,Authors], req => {
  //   req.target.data
  //   console.log('req.target.data',req.target.data);
  //   return cds.tx(req).run(req.query)
  // }
  // )

  this.on('READ',Books,async req=>{
    // console.log('Books send method is invoked');
    // // await this.send('GET','/Books')
    // console.log('send',await this.send('GET','/Authors'));
    // return cds.run(req.query)
    try {
      console.log('Books READ method is invoked');
     // const srv=new cds.Service;
      // Log the contents of req.query for debugging
      console.log('req.query:', req.query);
  
      // Attempt to send a GET request to "/Authors"
      console.log('Sending GET request to /Authors');
      // const authorsResponse = await this.send('GET', '/Authors');
      //  await this.get(Books)
      // const qu=SELECT.from `sap.capire.Authors`.where `name like '%Nitishraj%'`;
      const qu=SELECT.from `sap.capire.Books`.where `title like '%Rich or Poor%'`;
      console.log(qu);
      return cds.tx(req).run(SELECT.from(Books).where({title:'Rich or Poor'}))
      // return cds.tx(req).run(qu)
      // return this.read('GET','/Books')
      // return this.read(Authors)
      
      
      // console.log('Received response from /Authors:');
  
      // console.log('Received response from /Authors:', authorsResponse);
  
      // Continue with the original query
      // return cds.run(req.query);
    } catch (error) {
      console.error('Error in Books READ handler:', error);
      throw error; // Rethrow the error to ensure it's propagated
    }
  })
//    this.send('GET','/Books')
//  this.send('GET','/Books/201')


  return super.init()
}
};





/** Generate primary keys for target entity in request */
async function genid (req) {
    console.log('inside genid function');
  const {id} = await SELECT.one.from(req.target).columns('max(ID) as id')
  req.data.ID = id - id % 100 + 100 + 1
}