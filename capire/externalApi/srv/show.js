module.exports = (async function () {


    const cds = require('@sap/cds');

    const connectingObject = await cds.connect.to('API_BUSINESS_PARTNER')

    this.on('READ', 'Participants', (req) => {

        console.log('👉🏻 Passing request to remote service....')

        return connectingObject.run(req.query);

    })
    
})