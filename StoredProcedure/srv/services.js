const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
   this.on('sleep', async () => {
      try {
         let dbQuery = 'Call "sleep"()';
         let results = await cds.run(dbQuery);

         // Extract result sets
         const resultSetShoes = results;

         // Return structured result
         return resultSetShoes;
      } catch (error) {
         cds.log().error(error);
         return false;
      }
   });
});
