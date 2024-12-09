const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
	const { Snail } = this.entities;
	const service = await cds.connect.to('SouthWind');
	this.on('READ', Snail, request => {
		return service.tx(request).run(request.query);
	});
})