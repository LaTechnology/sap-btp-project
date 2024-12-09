const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');
	this.on('READ', Products, request => {
		return service.tx(request).run(request.query);
	});
});

// module.exports = cds.service.impl(async function() {
// 	const { Persons } = this.entities;
// 	const service = await cds.connect.to('NorthWind');
// 	this.on('READ', Persons, request => {
// 		return service.tx(request).run(request.query);
// 	});
// });

// const cds = require('@sap/cds');
// const cdse = require('cdse');

// module.exports = cds.service.impl(async function() {
// 	const { Products } = this.entities;
// 	const service = await cdse.connect.to('NorthWind');
// 	this.on('READ', Products, async () => {
// 		const result = await service.run({ url: 'Products' });
// 		return result.value;
// 	});
// });