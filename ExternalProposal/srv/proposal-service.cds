using {proposalMetadata as external} from './external/proposalMetadata';

service CatalogService { 

    @readonly 

    entity ProposalSupplier as projection on external.ProposalSupplier
    entity ProposalSupplierContact as projection on external.ProposalSupplierContact

} 
// annotate CatalogService.Products with @(requires:'support');