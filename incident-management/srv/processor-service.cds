using { sap.capire.incidents as my } from '../db/schema';
service ProcessorService { 
    entity Incidents as projection on my.Incidents;
    // entity Authors as projection on my.Authors;
    // entity Books as projection on my.Books;
    // entity Employees as projection on my.Employees;
       entity Addresses as projection on my.Addresses;

    @readonly
    entity Customers as projection on my.Customers;
}
// extend projection ProcessorService.Customers with {
//   firstName || ' ' || lastName || ' ' || email as name: String
// }
