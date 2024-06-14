namespace proposal.service;
using {com.ladera.sap.btp.contract.proposal.systems as db} from '../db/schema';



service proposal {
    
    
    entity LoginCredentials @(require: [

        {grand: 'Read', to: 'customer'}

    ]) as projection on db.PS_USER ;
    entity ProposalSupplier as projection on db.PS_VENDOR_ORG;
    entity ProposalSupplierContact as projection on db.PS_VENDOR_ORG_CONTACT;
    entity ProposalCustomer as projection on db.PS_CUSTOMER_ORG;
    entity ProposalCustomerContact as projection on db.PS_CUSTOMER_ORG_CONTACT;
    entity PS_DETAILS as projection on db.PS_DETAILS;
    entity PS_MAIN_SECTION as projection on db.PS_MAIN_SECTION;
    entity PS_SUB_SECTION as projection on db.PS_SUB_SECTION;
    entity PS_PROJECT_TYPE as projection on db.PS_PROJECT_TYPE;
    entity PS_TEMPLATE as projection on db.PS_TEMPLATE;
    
}


annotate proposal.ProposalCustomer with @(requires: 'authenticated-user');
