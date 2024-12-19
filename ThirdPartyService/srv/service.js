module.exports = (async function() {
//   const vcapServices = JSON.parse(process.env.VCAP_SERVICES);

//   // Extract the user-provided service details
//   const userProvided = vcapServices['user-provided'];
//   const myCredentials = userProvided.find(service => service.name === 'My-Credentialss');

//   if (!myCredentials) {
//     console.error('User-Provided Service not found!');
//     return req.error(500, 'Service configuration is missing.');
// }


 
    const cds = require('@sap/cds');
    const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER')
    this.on('READ', 'Supplier', (req) => {
      return S4bupa.run(req.query)
    })
    })