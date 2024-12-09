using {NorthWind as external} from './external/NorthWind.csn';

using { sap.capire as my } from '../db/schema';
service AdminService {
  entity Products2 as projection on my.Products2;
  entity WithoutPrime as projection on my.WithoutPrime;
}

service CatalogService {

    // @readonly
    
    entity FeaturedProduct as projection on external.FeaturedProduct;
//    @cds.redirection.target
    // entity Customer as projection on external.Customer {TotalExpense};
    entity Employee as projection on external.Employee;
     @cds.redirection.target
    entity Products as projection on external.Products;
    entity ProductDetails as projection on external.ProductDetails;
    entity Categories as projection on external.Categories;
    entity Suppliers as projection on external.Suppliers{*} excluding{Address};
    //  @cds.redirection.target
    // entity Persons as projection on external.Persons;
    entity PersonDetails as projection on external.PersonDetails{*} excluding{Address};
    entity Advertisements as projection on external.Advertisements{Name,AirDate,FeaturedProduct};

    


}
// annotate CatalogService.Employee with @cds.persistence:{table,skip:false};
annotate CatalogService.Products with @cds.persistence:{table,skip:false};
annotate CatalogService.Categories with @cds.persistence:{table,skip:false};
