using {  capire.purchase.db as db} from '../db/schema';

service Purchase {

    entity Customers as projection on db.Customers;
    entity Products as projection on db.Products;
    entity Purchases as projection on db.Purchases;

}