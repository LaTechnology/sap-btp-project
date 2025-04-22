const cds = require('@sap/cds');

// module.exports = cds.service.impl(async function() {
// 	const { ProposalSupplier,ProposalSupplierContact } = this.entities;
// 	const service = await cds.connect.to('proposalMetadata');
// 	this.on('READ', ProposalSupplier, request => {
//         const query = SELECT.from(ProposalSupplier)
//             .join(ProposalSupplierContact).on(
//                 ProposalSupplier.ID.equals(ProposalSupplierContact.supplierID)
//             );
// 		// const LOG=cds.log('connection logger');
// 		// LOG.info('connection logger entered');
// 		// LOG.info('connection logger ended');	
//         return service.tx(request).run(query);
// 	});
// });


module.exports = cds.service.impl(async function() {
	const { ProposalSupplier } = this.entities;
	const service = await cds.connect.to('proposalMetadata');
	this.on('READ', ProposalSupplier, request => {
		// const LOG=cds.log('connection logger');
		// LOG.info('connection logger entered');
		// LOG.info('connection logger ended');	
		return service.tx(request).run(request.query);
	});
});
