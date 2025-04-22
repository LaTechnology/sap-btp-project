const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');
	this.on('READ', Products, request => {
		// const LOG=cds.log('connection logger');
		// LOG.info('connection logger entered');
		// LOG.info('connection logger ended');	
		return service.tx(request).run(request.query);
	});
});
