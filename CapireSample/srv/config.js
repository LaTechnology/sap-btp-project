cds=require('@sap/cds');
module.exports=async function (){
cds.app = require('express')()
const { Books, Author } = this.entities

cds.model = await cds.load('*')
cds.services = await cds.serve('CatalogService').from(cds.model).in(cds.app);
};
